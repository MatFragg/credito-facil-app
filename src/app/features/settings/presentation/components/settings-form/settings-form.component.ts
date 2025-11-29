import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { Settings, CreateSettingsData, UpdateSettingsData } from '../../../domain/models/settings.model';
import { Currency, CurrencyLabels } from '../../../domain/models/currency.enum';
import { InterestRateType, InterestRateTypeLabels } from '../../../domain/models/interest-rate-type.enum';
import { Capitalization, getCapitalizationOptions } from '../../../domain/models/capitalization.enum';
import { GracePeriodType, getGracePeriodTypeOptions } from '../../../domain/models/grace-period-type.enum';

@Component({
    selector: 'app-settings-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatIconModule
    ],
    templateUrl: './settings-form.component.html',
    styleUrls: ['./settings-form.component.css']
})
export class SettingsFormComponent implements OnInit, OnChanges {
    @Input() settings: Settings | null = null;
    @Input() saving: boolean = false;
    @Output() save = new EventEmitter<CreateSettingsData | UpdateSettingsData>();
    @Output() reset = new EventEmitter<void>();

    form!: FormGroup;

    // Enum references for template
    readonly Currency = Currency;
    readonly CurrencyLabels = CurrencyLabels;
    readonly InterestRateType = InterestRateType;
    readonly InterestRateTypeLabels = InterestRateTypeLabels;

    // Options for dropdowns  
    readonly capitalizationOptions = getCapitalizationOptions();
    readonly gracePeriodOptions = getGracePeriodTypeOptions();

    constructor(private fb: FormBuilder) {
        this.form = this.createForm();
    }

    ngOnInit(): void {
        if (this.settings) {
            this.loadSettings(this.settings);
        }

        this.setupConditionalValidation();
    }

    ngOnChanges(): void {
        if (this.settings && this.form) {
            this.loadSettings(this.settings);
        }
    }

    private createForm(): FormGroup {
        return this.fb.group({
            currency: [Currency.PEN, [Validators.required]],
            interestRateType: [InterestRateType.EFFECTIVE, [Validators.required]],
            capitalization: [null],
            gracePeriodType: [GracePeriodType.NONE, [Validators.required]],
            graceMonths: [0, [Validators.required, Validators.min(0), Validators.max(60)]]
        });
    }

    private loadSettings(settings: Settings): void {
        this.form.patchValue({
            currency: settings.currency,
            interestRateType: settings.interestRateType,
            capitalization: settings.capitalization,
            gracePeriodType: settings.gracePeriodType,
            graceMonths: settings.graceMonths
        });
    }

    private setupConditionalValidation(): void {
        this.form.get('interestRateType')?.valueChanges.subscribe(rateType => {
            const capitalizationControl = this.form.get('capitalization');

            if (rateType === InterestRateType.NOMINAL) {
                capitalizationControl?.enable();
                capitalizationControl?.setValidators([Validators.required]);

                if (!capitalizationControl?.value) {
                    capitalizationControl?.setValue(Capitalization.MONTHLY);
                }
            } else {
                capitalizationControl?.disable();
                capitalizationControl?.clearValidators();
                capitalizationControl?.setValue(null);
            }

            capitalizationControl?.updateValueAndValidity();
        });

        this.form.get('interestRateType')?.updateValueAndValidity();
    }

    showCapitalization(): boolean {
        return this.form.get('interestRateType')?.value === InterestRateType.NOMINAL;
    }

    onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const formData: CreateSettingsData = {
            ...this.form.value,
            language: 'es',
            isCurrentSetting: true
        };

        this.save.emit(formData);
    }

    onReset(): void {
        this.reset.emit();
    }

    onCancel(): void {
        if (this.settings) {
            this.loadSettings(this.settings);
        } else {
            this.form.reset();
        }
    }
}
