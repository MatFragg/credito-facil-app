import { BaseDto } from "./base.dto";
import { BaseModel } from "./base.model";

export interface BaseMapper<TModel extends BaseModel, TDto extends BaseDto> {

    toModelFromDto(dto: TDto): TModel;
    toCreateDtoFromModel(model: TModel): TDto;
    toUpdateDtoFromModel(model: TModel): TDto;
    toModelsArrayFromDto(dtos: TDto[]): TModel[];
    toResponseDto(model: TModel): TDto;
}
