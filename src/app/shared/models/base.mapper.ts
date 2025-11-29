import { BaseModel } from "./base.model";

export interface BaseMapper<TModel extends BaseModel, TDtoRequest, TDtoResponse> {

    toModelFromDto(dto: TDtoResponse): TModel;
    toCreateDtoFromModel(model: TModel): TDtoRequest;
    toUpdateDtoFromModel(model: TModel): TDtoRequest;
    toModelsArrayFromDto(dtos: TDtoResponse[]): TModel[];
    toResponseDto(model: TModel): TDtoResponse;
}
