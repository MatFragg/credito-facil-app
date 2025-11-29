import { Routes } from '@angular/router';
import { SimulationCalculatorPageComponent } from './presentation/pages/simulation-calculator-page/simulation-calculator-page.component';
import { SimulationsHistoryPageComponent } from './presentation/pages/simulations-history-page/simulations-history-page.component';
import { SimulationDetailsPageComponent } from './presentation/pages/simulation-details-page/simulation-details-page.component';
import { SimulationRepository } from './domain/repositories/simulation.repository';
import { SimulationRepositoryImpl } from './data/repositories/simulation.repository.impl';
import { CalculateSimulationUseCase } from './domain/usecases/calculate-simulation.usecase';
import { SaveSimulationUseCase } from './domain/usecases/save-simulation.usecase';
import { GetPaymentScheduleUseCase } from './domain/usecases/get-payment-schedule.usecase';
import { UpdateSimulationUseCase } from './domain/usecases/update-simulation.usecase';
import { GetMySimulationsUseCase } from './domain/usecases/get-my-simulations.usecase';
import { SimulationFacade } from './presentation/state/simulation.facade';

// Clients Feature Dependencies
import { ClientRepository } from '../clients/domain/repositories/client.repository';
import { ClientRepositoryImpl } from '../clients/data/repositories/client.repository.impl';
import { GetClientsUseCase } from '../clients/domain/usecases/get-clients.usecase';
import { GetClientByIdUseCase } from '../clients/domain/usecases/get-client-by-id.usecase';
import { SearchClientByDniUseCase } from '../clients/domain/usecases/search-client-by-dni.usecase';
import { CreateClientUseCase } from '../clients/domain/usecases/create-client.usecase';
import { UpdateClientUseCase } from '../clients/domain/usecases/update-client.usecase';
import { DeleteClientUseCase } from '../clients/domain/usecases/delete-client.usecase';
import { ClientsFacade } from '../clients/presentation/state/clients.facade';

// Properties Feature Dependencies
import { PropertyRepository } from '../properties/domain/repositories/property.repository';
import { PropertyRepositoryImpl } from '../properties/data/repositories/property.repository.impl';
import { GetPropertiesUseCase } from '../properties/domain/usecases/get-properties.usecase';
import { CreatePropertyUseCase } from '../properties/domain/usecases/create-property.usecase';
import { UpdatePropertyUseCase } from '../properties/domain/usecases/update-property.usecase';
import { DeletePropertyUseCase } from '../properties/domain/usecases/delete-property.usecase';
import { PropertiesFacade } from '../properties/presentation/state/properties.facade';

// Bank Entities Feature Dependencies
import { BankEntityRepository } from '../bank-entities/domain/repositories/bank-entity.repository';
import { BankEntityRepositoryImpl } from '../bank-entities/data/repositories/bank-entity.repository.impl';
import { BankEntityDataSource } from '../bank-entities/data/datasources/bank-entity.datasource';
import { BankEntityMapper } from '../bank-entities/data/mappers/bank-entity.mapper';
import { GetAllBankEntitiesUseCase } from '../bank-entities/domain/usecases/get-all-bank-entities.usecase';
import { GetBankEntityByIdUseCase } from '../bank-entities/domain/usecases/get-bank-entity-by-id.usecase';
import { UpdateBankEntityUseCase } from '../bank-entities/domain/usecases/update-bank-entity.usecase';
import { CompareBankEntitiesUseCase } from '../bank-entities/domain/usecases/compare-bank-entities.usecase';
import { SearchBankEntitiesUseCase } from '../bank-entities/domain/usecases/search-bank-entities.usecase';
import { BankEntitiesFacade } from '../bank-entities/presentation/state/bank-entities.facade';

/**
 * Simulations Feature Routes
 * Configures lazy-loaded routes with proper dependency injection
 */
export const SIMULATIONS_ROUTES: Routes = [
    {
        path: '',
        providers: [
            // Repositories
            { provide: SimulationRepository, useClass: SimulationRepositoryImpl },

            // Use Cases
            CalculateSimulationUseCase,
            SaveSimulationUseCase,
            GetPaymentScheduleUseCase,
            UpdateSimulationUseCase,
            GetMySimulationsUseCase,

            // Facade
            SimulationFacade,

            // Clients Providers
            { provide: ClientRepository, useClass: ClientRepositoryImpl },
            GetClientsUseCase,
            GetClientByIdUseCase,
            SearchClientByDniUseCase,
            CreateClientUseCase,
            UpdateClientUseCase,
            DeleteClientUseCase,
            ClientsFacade,

            // Properties Providers
            { provide: PropertyRepository, useClass: PropertyRepositoryImpl },
            GetPropertiesUseCase,
            CreatePropertyUseCase,
            UpdatePropertyUseCase,
            DeletePropertyUseCase,
            PropertiesFacade,

            // Bank Entities Providers
            BankEntityDataSource,
            BankEntityMapper,
            { provide: BankEntityRepository, useClass: BankEntityRepositoryImpl },
            GetAllBankEntitiesUseCase,
            GetBankEntityByIdUseCase,
            UpdateBankEntityUseCase,
            CompareBankEntitiesUseCase,
            SearchBankEntitiesUseCase,
            BankEntitiesFacade
        ],
        children: [
            {
                path: '',
                component: SimulationsHistoryPageComponent
            },
            {
                path: 'calculator',
                component: SimulationCalculatorPageComponent
            },
            {
                path: ':id',
                component: SimulationDetailsPageComponent
            }
        ]
    }
];
