import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedSimulations } from '../models/simulation.model';
import { SimulationRepository } from '../repositories/simulation.repository';

@Injectable()
export class GetMySimulationsUseCase {
    constructor(private repository: SimulationRepository) { }

    execute(params: { page: number; size: number }): Observable<PaginatedSimulations> {
        return this.repository.getMySimulations(params.page, params.size);
    }
}
