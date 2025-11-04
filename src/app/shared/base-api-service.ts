import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { BaseModel } from './models/base.model';
import { BaseDto } from './models/base.dto';
import { BaseMapper } from './models/base.mapper';

/**
 * Base class for API endpoint operations with generic CRUD functionality.
 *
 * @template TModel - The model type, which must extend BaseModel.
 * @template TDto - The dto type, must extend BaseDto.
 * @template TResponse - The response type, must extend BaseDto.
 * @template TMapper - The mapper type implementing BaseMapper with matching generics.
 */
export abstract class BaseApiEndpoint<
  TModel extends BaseModel,
  TDto extends BaseDto,
  TMapper extends BaseMapper<TModel, TDto>
> {
  constructor(
    protected http: HttpClient,
    protected endpointUrl: string,
    protected mapper: TMapper
  ) {}

  /**
   * Retrieves all entities from the API, handling both response objects and arrays.
   * @returns An Observable for an array of entities.
   */
  getAll(): Observable<TModel[]> {
    return this.http.get<TDto | TDto[]>(this.endpointUrl).pipe(
      map(dto => {
        console.log(dto);
        if (Array.isArray(dto)) {
          return this.mapper.toModelsArrayFromDto(dto);
        }
        return [this.mapper.toModelFromDto(dto)];
      }),
      catchError(this.handleError('Failed to fetch entities'))
    );
  }


  /**
   * Retrieves a single model by ID.
   * @param id - The ID of the model.
   * @returns An Observable of the model.
   */
  getById(id: number): Observable<TModel> {
    return this.http.get<TDto>(`${this.endpointUrl}/${id}`).pipe(
      map(dto => this.mapper.toModelFromDto(dto)),
      catchError(this.handleError('Failed to fetch entity'))
    );
  }

  /**
   * Creates a new model.
   * @param model - The entity to create.
   * @returns An Observable of the created model.
   */
  create(entity: TModel): Observable<TModel> {
    const resource = this.mapper.toCreateDtoFromModel(entity);
    return this.http.post<TDto>(this.endpointUrl, resource).pipe(
      map(created => this.mapper.toModelFromDto(created)),
      catchError(this.handleError('Failed to create entity'))
    );
  }

  /**
   * Updates an existing entity.
   * @param model - The model to update.
   * @param id - The ID of the model.
   * @returns An Observable of the updated model.
   */
  update(model: TModel, id: number): Observable<TModel> {
    const resource = this.mapper.toUpdateDtoFromModel(model);
    return this.http.put<TDto>(`${this.endpointUrl}/${id}`, resource).pipe(
      map(updated => this.mapper.toModelFromDto(updated)),
      catchError(this.handleError('Failed to update entity'))
    );
  }

  /**
   * Deletes an entity by ID.
   * @param id - The ID of the model to delete.
   * @returns An Observable of void.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpointUrl}/${id}`).pipe(
      catchError(this.handleError('Failed to delete entity'))
    );
  }

  /**
   * Handles HTTP errors and returns a user-friendly error message.
   * @param operation - The operation that failed.
   * @returns A function that transforms an error into an Observable.
   */
  protected handleError(operation: string) {
    return (error: HttpErrorResponse): Observable<never> => {
      let errorMessage = operation;
      if (error.status === 404) {
        errorMessage = `${operation}: Resource not found`;
      } else if (error.error instanceof ErrorEvent) {
        errorMessage = `${operation}: ${error.error.message}`;
      } else {
        errorMessage = `${operation}: ${error.statusText || 'Unexpected error'}`;
      }
      return throwError(() => new Error(errorMessage));
    };
  }
}