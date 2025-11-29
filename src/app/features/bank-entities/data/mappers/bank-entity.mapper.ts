import { Injectable } from '@angular/core';
import { BankEntityDto, BankEntityRequestDto } from '../dtos/bank-entity.dto';
import { BankEntity } from '../../domain/models/bank-entity.model';
import { BaseMapper } from '../../../../shared/models/base.mapper';

/**
 * Mapper for Bank Entity
 * Converts between DTOs and domain models following BaseMapper interface
 */
@Injectable()
export class BankEntityMapper implements BaseMapper<BankEntity, BankEntityRequestDto, BankEntityDto> {

    /**
     * Converts BankEntityDto from backend to BankEntity domain model
     */
    toModelFromDto(dto: BankEntityDto): BankEntity {
        return {
            id: dto.id,
            name: dto.name,
            currentRate: dto.currentRate,
            minimunIncome: dto.minimunIncome,
            maxCoveragePct: dto.maxCoveragePct,
            // NCMV fields
            desgravamenRate: dto.desgravamenRate,
            ncmvMinPropertyValue: dto.ncmvMinPropertyValue,
            ncmvMaxPropertyValue: dto.ncmvMaxPropertyValue,
            ncmvMaxPropertyValueCRC: dto.ncmvMaxPropertyValueCRC,
            pbpThresholdLow: dto.pbpThresholdLow,
            pbpAmountStandard: dto.pbpAmountStandard,
            pbpAmountPlus: dto.pbpAmountPlus,
            supportsNCMV: dto.supportsNCMV,
        };
    }

    /**
     * Converts array of BankEntityDto to array of BankEntity models
     */
    toModelsArrayFromDto(dtos: BankEntityDto[]): BankEntity[] {
        return dtos.map(dto => this.toModelFromDto(dto));
    }

    /**
     * Converts BankEntity to BankEntityRequestDto for CREATE operations
     */
    toCreateDtoFromModel(model: BankEntity): BankEntityRequestDto {
        return {
            currentRate: model.currentRate,
            minimunIncome: model.minimunIncome,
            maxCoveragePct: model.maxCoveragePct,
            // NCMV fields
            desgravamenRate: model.desgravamenRate,
            ncmvMinPropertyValue: model.ncmvMinPropertyValue,
            ncmvMaxPropertyValue: model.ncmvMaxPropertyValue,
            ncmvMaxPropertyValueCRC: model.ncmvMaxPropertyValueCRC,
            pbpThresholdLow: model.pbpThresholdLow,
            pbpAmountStandard: model.pbpAmountStandard,
            pbpAmountPlus: model.pbpAmountPlus,
            supportsNCMV: model.supportsNCMV,
        };
    }

    /**
     * Converts BankEntity to BankEntityRequestDto for UPDATE operations
     */
    toUpdateDtoFromModel(model: BankEntity): BankEntityRequestDto {
        return {
            currentRate: model.currentRate,
            minimunIncome: model.minimunIncome,
            maxCoveragePct: model.maxCoveragePct,
            // NCMV fields
            desgravamenRate: model.desgravamenRate,
            ncmvMinPropertyValue: model.ncmvMinPropertyValue,
            ncmvMaxPropertyValue: model.ncmvMaxPropertyValue,
            ncmvMaxPropertyValueCRC: model.ncmvMaxPropertyValueCRC,
            pbpThresholdLow: model.pbpThresholdLow,
            pbpAmountStandard: model.pbpAmountStandard,
            pbpAmountPlus: model.pbpAmountPlus,
            supportsNCMV: model.supportsNCMV,
        };
    }

    /**
     * Converts BankEntity domain model to BankEntityDto response
     */
    toResponseDto(model: BankEntity): BankEntityDto {
        return {
            id: model.id,
            name: model.name,
            currentRate: model.currentRate,
            minimunIncome: model.minimunIncome,
            maxCoveragePct: model.maxCoveragePct,
            // NCMV fields
            desgravamenRate: model.desgravamenRate,
            ncmvMinPropertyValue: model.ncmvMinPropertyValue,
            ncmvMaxPropertyValue: model.ncmvMaxPropertyValue,
            ncmvMaxPropertyValueCRC: model.ncmvMaxPropertyValueCRC,
            pbpThresholdLow: model.pbpThresholdLow,
            pbpAmountStandard: model.pbpAmountStandard,
            pbpAmountPlus: model.pbpAmountPlus,
            supportsNCMV: model.supportsNCMV,
        };
    }
}