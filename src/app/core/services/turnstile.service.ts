import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * TurnstileService
 * Manages Cloudflare Turnstile widget lifecycle for anti-bot validation
 */
@Injectable({
    providedIn: 'root'
})
export class TurnstileService {
    private static readonly SCRIPT_ID = 'cf-turnstile-script';
    private static readonly SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    private widgetId: string | null = null;
    private scriptLoaded = false;

    /**
     * Load Turnstile script if not already loaded
     */
    loadScript(): Promise<void> {
        if (this.scriptLoaded) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            // Check if script already exists
            if (document.getElementById(TurnstileService.SCRIPT_ID)) {
                this.scriptLoaded = true;
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.id = TurnstileService.SCRIPT_ID;
            script.src = TurnstileService.SCRIPT_URL;
            script.async = true;
            script.defer = true;

            script.onload = () => {
                this.scriptLoaded = true;
                resolve();
            };

            script.onerror = () => {
                reject(new Error('Failed to load Turnstile script'));
            };

            document.head.appendChild(script);
        });
    }

    /**
     * Render Turnstile widget in the specified container
     * @param container HTML element to render widget in
     * @param callback Optional callback when widget is rendered
     */
    async render(container: HTMLElement, callback?: (token: string) => void): Promise<void> {
        await this.loadScript();

        // Wait for turnstile global object to be available
        await this.waitForTurnstile();

        const turnstile = (window as any).turnstile;

        if (!turnstile) {
            throw new Error('Turnstile not loaded');
        }

        // Render the widget
        this.widgetId = turnstile.render(container, {
            sitekey: environment.turnstile.siteKey,
            callback: callback,
            theme: 'light',
            size: 'normal'
        });
    }

    /**
     * Get the current token from the widget
     */
    getToken(): string | null {
        const turnstile = (window as any).turnstile;

        if (!turnstile || !this.widgetId) {
            return null;
        }

        return turnstile.getResponse(this.widgetId);
    }

    /**
     * Reset the widget (clear the token)
     */
    reset(): void {
        const turnstile = (window as any).turnstile;

        if (turnstile && this.widgetId) {
            turnstile.reset(this.widgetId);
        }
    }

    /**
     * Remove the widget
     */
    remove(): void {
        const turnstile = (window as any).turnstile;

        if (turnstile && this.widgetId) {
            turnstile.remove(this.widgetId);
            this.widgetId = null;
        }
    }

    /**
     * Wait for Turnstile global object to be available
     */
    private waitForTurnstile(): Promise<void> {
        return new Promise((resolve) => {
            const checkTurnstile = () => {
                if ((window as any).turnstile) {
                    resolve();
                } else {
                    setTimeout(checkTurnstile, 100);
                }
            };
            checkTurnstile();
        });
    }
}
