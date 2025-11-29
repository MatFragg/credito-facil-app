import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { BankEntitiesPageComponent } from './presentation/pages/bank-entities-page/bank-entities-page.component';

// Domain layer
import { BankEntityRepository } from './domain/repositories/bank-entity.repository';
import { GetAllBankEntitiesUseCase } from './domain/usecases/get-all-bank-entities.usecase';
import { GetBankEntityByIdUseCase } from './domain/usecases/get-bank-entity-by-id.usecase';
import { UpdateBankEntityUseCase } from './domain/usecases/update-bank-entity.usecase';
import { CompareBankEntitiesUseCase } from './domain/usecases/compare-bank-entities.usecase';
import { SearchBankEntitiesUseCase } from './domain/usecases/search-bank-entities.usecase';

// Data layer
import { BankEntityRepositoryImpl } from './data/repositories/bank-entity.repository.impl';
import { BankEntityDataSource } from './data/datasources/bank-entity.datasource';
import { BankEntityMapper } from './data/mappers/bank-entity.mapper';

// Presentation layer
import { BankEntitiesFacade } from './presentation/state/bank-entities.facade';

/**
 * Bank Entities Feature Routes
 * Configured with dependency injection providers for clean architecture
 */
export const BANK_ENTITIES_ROUTES: Routes = [
    {
        path: '',
        component: BankEntitiesPageComponent,
        providers: [
            // Data Layer
            BankEntityDataSource,
            BankEntityMapper,
            // Repository Implementation
            {
                provide: BankEntityRepository,
                useClass: BankEntityRepositoryImpl
            },
            // Use Cases
            GetAllBankEntitiesUseCase,
            GetBankEntityByIdUseCase,
            UpdateBankEntityUseCase,
            CompareBankEntitiesUseCase,
            SearchBankEntitiesUseCase,
            // Facade
            BankEntitiesFacade
        ]
    }
];
