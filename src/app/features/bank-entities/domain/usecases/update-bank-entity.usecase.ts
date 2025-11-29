import { Injectable } from '@angular/core';
import { Observable, switchMap, throwError } from 'rxjs';
import { BankEntityRepository } from '../repositories/bank-entity.repository';
import { BankEntity, BankEntityValidator } from '../models/bank-entity.model';

/**
 * Use case for updating a bank entity
 * ADMIN ONLY operation - requires ADMIN role
 */
@Injectable()
export class UpdateBankEntityUseCase {

  constructor(private repository: BankEntityRepository) { }
  /**
   * Executes the use case to update a bank entity
   * @param id Bank entity ID
   * @param entity Partial bank entity with updated fields
   * @returns Observable of updated BankEntity
   */
  execute(id: number, updated: BankEntity): Observable<BankEntity> {
    return this.repository.findById(id).pipe(
      switchMap((original: BankEntity) => {
        const isSameName = BankEntityValidator.isSameName(
          original.name,
          updated.name
        );

        if (!isSameName) {
          return throwError(() => new Error("El nombre de la entidad bancaria no puede modificarse."));
        }

        const isValidUpdate = BankEntityValidator.isValidUpdate(original, updated);

        if (!isValidUpdate) {
          return throwError(() => new Error("La información proporcionada no es válida."));
        }

        return this.repository.update(id, updated);
      })
    );
  }
}
