import { Routes } from '@angular/router';
import { PropertiesCatalogPageComponent } from './presentation/pages/properties-catalog-page/properties-catalog-page.component';
import { CreatePropertyPageComponent } from './presentation/pages/create-property-page/create-property-page.component';
import { PropertyDetailsPageComponent } from './presentation/pages/property-details-page/property-details-page.component';
import { PropertyRepository } from './domain/repositories/property.repository';
import { PropertyRepositoryImpl } from './data/repositories/property.repository.impl';
import { GetPropertiesUseCase } from './domain/usecases/get-properties.usecase';
import { CreatePropertyUseCase } from './domain/usecases/create-property.usecase';
import { UpdatePropertyUseCase } from './domain/usecases/update-property.usecase';
import { DeletePropertyUseCase } from './domain/usecases/delete-property.usecase';
import { PropertiesFacade } from './presentation/state/properties.facade';

/**
 * Properties Feature Routes
 * Configures lazy-loaded routes with proper dependency injection
 */
export const PROPERTIES_ROUTES: Routes = [
    {
        path: '',
        component: PropertiesCatalogPageComponent,
        providers: [
            { provide: PropertyRepository, useClass: PropertyRepositoryImpl },
            GetPropertiesUseCase,
            CreatePropertyUseCase,
            UpdatePropertyUseCase,
            DeletePropertyUseCase,
            PropertiesFacade
        ]
    },
    {
        path: 'new',
        component: CreatePropertyPageComponent,
        providers: [
            { provide: PropertyRepository, useClass: PropertyRepositoryImpl },
            GetPropertiesUseCase,
            CreatePropertyUseCase,
            UpdatePropertyUseCase,
            DeletePropertyUseCase,
            PropertiesFacade
        ]
    },
    {
        path: ':id',
        component: PropertyDetailsPageComponent,
        providers: [
            { provide: PropertyRepository, useClass: PropertyRepositoryImpl },
            GetPropertiesUseCase,
            CreatePropertyUseCase,
            UpdatePropertyUseCase,
            DeletePropertyUseCase,
            PropertiesFacade
        ]
    }
];
