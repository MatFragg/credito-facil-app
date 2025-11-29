import { Routes } from '@angular/router';
import { ClientsPageComponent } from './presentation/pages/clients-page/clients-page.component';
import { CreateClientPageComponent } from './presentation/pages/create-client-page/create-client-page.component';
import { ClientRepository } from './domain/repositories/client.repository';
import { ClientRepositoryImpl } from './data/repositories/client.repository.impl';
import { GetClientsUseCase } from './domain/usecases/get-clients.usecase';
import { GetClientByIdUseCase } from './domain/usecases/get-client-by-id.usecase';
import { SearchClientByDniUseCase } from './domain/usecases/search-client-by-dni.usecase';
import { CreateClientUseCase } from './domain/usecases/create-client.usecase';
import { UpdateClientUseCase } from './domain/usecases/update-client.usecase';
import { DeleteClientUseCase } from './domain/usecases/delete-client.usecase';

/**
 * Clients Feature Routes
 * Configures lazy-loaded routes with proper dependency injection
 */
export const CLIENTS_ROUTES: Routes = [
    {
        path: '',
        component: ClientsPageComponent,
        providers: [
            { provide: ClientRepository, useClass: ClientRepositoryImpl },
            GetClientsUseCase,
            GetClientByIdUseCase,
            SearchClientByDniUseCase,
            CreateClientUseCase,
            UpdateClientUseCase,
            DeleteClientUseCase
        ]
    },
    {
        path: 'new',
        component: CreateClientPageComponent,
        providers: [
            { provide: ClientRepository, useClass: ClientRepositoryImpl },
            CreateClientUseCase
        ]
    }
];
