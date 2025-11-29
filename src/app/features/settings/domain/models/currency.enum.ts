/**
 * Currency Enum
 * Represents available currencies for mortgage simulations
 */
export enum Currency {
    PEN = 'PEN',  // Soles Peruanos
    USD = 'USD'   // Dólares Americanos
}

/**
 * Currency Display Labels
 */
export const CurrencyLabels: Record<Currency, string> = {
    [Currency.PEN]: 'Soles (S/)',
    [Currency.USD]: 'Dólares ($)'
};

/**
 * Get currency symbol
 */
export function getCurrencySymbol(currency: Currency): string {
    return currency === Currency.PEN ? 'S/' : '$';
}
