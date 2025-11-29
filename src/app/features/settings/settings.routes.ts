import { Routes } from '@angular/router';
import { SettingsPageComponent } from './presentation/pages/settings-page/settings-page.component';
import { SettingsRepository } from './domain/repositories/settings.repository';
import { SettingsRepositoryImpl } from './data/repositories/settings.repository.impl';
import { GetCurrentSettingsUseCase } from './domain/usecases/get-current-settings.usecase';
import { GetSettingsHistoryUseCase } from './domain/usecases/get-settings-history.usecase';
import { CreateSettingsUseCase } from './domain/usecases/create-settings.usecase';
import { UpdateSettingsUseCase } from './domain/usecases/update-settings.usecase';
import { ResetToDefaultsUseCase } from './domain/usecases/reset-to-defaults.usecase';
import { SettingsFacade } from './presentation/state/settings.facade';

/**
 * Settings Feature Routes
 * Configures lazy-loaded routes with proper dependency injection
 */
export const SETTINGS_ROUTES: Routes = [
    {
        path: '',
        component: SettingsPageComponent,
        providers: [
            { provide: SettingsRepository, useClass: SettingsRepositoryImpl },
            GetCurrentSettingsUseCase,
            GetSettingsHistoryUseCase,
            CreateSettingsUseCase,
            UpdateSettingsUseCase,
            ResetToDefaultsUseCase,
            SettingsFacade
        ]
    }
];
