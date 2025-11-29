import { Component, Input, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseModalFormComponent } from '../../../../../shared/components/base-modal-form/base-modal-form.component';
import { BankEntity } from '../../../domain/models/bank-entity.model';
import { BankEntitiesFacade } from '../../state/bank-entities.facade';

/**
 * Bank Entity Form Component
 * Modal form for editing bank entities (ADMIN only)
 * Extends BaseModalFormComponent which provides modal UI and form handling
 */
@Component({
    selector: 'app-bank-entity-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
    ],
    templateUrl: './bank-entity-form.component.html',
    styleUrls: ['./bank-entity-form.component.css']
})
export class BankEntityFormComponent extends BaseModalFormComponent implements OnInit, OnChanges {
    @Input() entity: BankEntity | null = null;

    private fb = inject(FormBuilder);
    private facade = inject(BankEntitiesFacade);

    override ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnChanges(changes: SimpleChanges): void {
        // When entity input changes, update form
        if (changes['entity'] && this.entity && this.form) {
            this.title = `Editar ${this.entity.name}`;
            this.form.patchValue({
                name: this.entity.name,
                currentRate: this.entity.currentRate,
                minimunIncome: this.entity.minimunIncome,
                maxCoveragePct: this.entity.maxCoveragePct
            });
        }
    }

    buildForm(): void {
        this.form = this.fb.group({
            name: ['', Validators.required],
            currentRate: [
                '',
                [
                    Validators.required,
                    Validators.min(7.5),
                    Validators.max(9.6)
                ]
            ],
            minimunIncome: [
                '',
                [
                    Validators.required,
                    Validators.min(2000)
                ]
            ],
            maxCoveragePct: [
                '',
                [
                    Validators.required,
                    Validators.min(0),
                    Validators.max(100)
                ]
            ]
        });
    }


    submitForm(): Observable<any> {
        if (!this.entity) {
            return throwError(() => new Error('No se ha seleccionado ninguna entidad'));
        }

        const formValue = this.form.value;
        const updatedEntity: BankEntity = {
            id: this.entity.id,
            name: formValue.name,
            currentRate: formValue.currentRate,
            minimunIncome: formValue.minimunIncome,
            maxCoveragePct: formValue.maxCoveragePct
        };

        // Call facade to update entity
        this.facade.update(this.entity.id, updatedEntity);

        // Return a completed observable - the facade handles the async operation
        return of(updatedEntity);
    }
}
