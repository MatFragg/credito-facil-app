import { SettingsDto, PaginatedSettingsDto } from '../dtos/settings.dto';
import { CreateSettingsDto } from '../dtos/create-settings.dto';
import { UpdateSettingsDto } from '../dtos/update-settings.dto';
import { Settings, CreateSettingsData, UpdateSettingsData, PaginatedSettings } from '../../domain/models/settings.model';
import { Currency } from '../../domain/models/currency.enum';
import { InterestRateType } from '../../domain/models/interest-rate-type.enum';
import { Capitalization } from '../../domain/models/capitalization.enum';
import { GracePeriodType } from '../../domain/models/grace-period-type.enum';

/**
 * Settings Mapper
 * Converts between DTOs and domain models
 */
export class SettingsMapper {
    /**
     * Convert DTO to domain model
     */
    static toModel(dto: SettingsDto): Settings {
        return {
            id: dto.id,
            userId: dto.userId,
            currency: dto.currency as Currency,
            language: dto.language,
            interestRateType: dto.interestRateType as InterestRateType,
            capitalization: dto.capitalization ? (dto.capitalization as Capitalization) : null,
            gracePeriodType: dto.gracePeriodType as GracePeriodType,
            graceMonths: dto.graceMonths,
            isCurrentSetting: dto.isCurrentSetting,
            createdAt: new Date(dto.createdAt)
        };
    }

    /**
     * Convert paginated DTO to paginated model
     */
    static toPaginatedModel(dto: PaginatedSettingsDto): PaginatedSettings {
        return {
            content: dto.content.map(item => this.toModel(item)),
            totalElements: dto.totalElements,
            totalPages: dto.totalPages,
            size: dto.size,
            number: dto.number,
            first: dto.first,
            last: dto.last,
            empty: dto.empty
        };
    }

    /**
     * Convert create data to DTO
     */
    static toCreateDto(data: CreateSettingsData): CreateSettingsDto {
        return {
            currency: data.currency,
            language: data.language,
            interestRateType: data.interestRateType,
            capitalization: data.capitalization,
            gracePeriodType: data.gracePeriodType,
            graceMonths: data.graceMonths,
            isCurrentSetting: data.isCurrentSetting
        };
    }

    /**
     * Convert update data to DTO
     */
    static toUpdateDto(data: UpdateSettingsData): UpdateSettingsDto {
        return {
            currency: data.currency,
            language: data.language,
            interestRateType: data.interestRateType,
            capitalization: data.capitalization,
            gracePeriodType: data.gracePeriodType,
            graceMonths: data.graceMonths,
            isCurrentSetting: data.isCurrentSetting
        };
    }
}
