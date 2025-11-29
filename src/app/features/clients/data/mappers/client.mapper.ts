import { ClientDto, PaginatedClientDto } from '../dtos/client.dto';
import { CreateClientDto } from '../dtos/create-client.dto';
import { UpdateClientDto } from '../dtos/update-client.dto';
import { Client, CreateClientData, UpdateClientData, PaginatedClients } from '../../domain/models/client.model';
import { EvaluationStatus } from '../../domain/models/evaluation-status.enum';

/**
 * Client Mapper
 * Converts between DTOs (API layer) and Domain Models
 */
export class ClientMapper {
    /**
     * Convert ClientDto to Client domain model
     */
    static toModel(dto: ClientDto): Client {
        return {
            id: dto.id,
            userId: dto.userId,
            firstName: dto.firstName,
            lastName: dto.lastName,
            dni: dto.dni,
            phone: dto.phone,
            email: dto.email,
            monthlyIncome: dto.monthlyIncome,
            occupation: dto.occupation,
            evaluationStatus: dto.evaluationStatus as EvaluationStatus,
            notes: dto.notes,
            createdAt: new Date(dto.createdAt),
            updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : null
        };
    }

    /**
     * Convert PaginatedClientDto to PaginatedClients domain model
     */
    static toPaginatedModel(dto: PaginatedClientDto): PaginatedClients {
        return {
            content: dto.content.map(ClientMapper.toModel),
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
     * Convert CreateClientData to CreateClientDto
     */
    static toCreateDto(data: CreateClientData): CreateClientDto {
        return {
            firstName: data.firstName,
            lastName: data.lastName,
            dni: data.dni,
            phone: data.phone,
            email: data.email,
            monthlyIncome: data.monthlyIncome,
            occupation: data.occupation,
            evaluationStatus: data.evaluationStatus,
            notes: data.notes
        };
    }

    /**
     * Convert UpdateClientData to UpdateClientDto
     */
    static toUpdateDto(data: UpdateClientData): UpdateClientDto {
        return {
            firstName: data.firstName,
            lastName: data.lastName,
            dni: data.dni,
            phone: data.phone,
            email: data.email,
            monthlyIncome: data.monthlyIncome,
            occupation: data.occupation,
            evaluationStatus: data.evaluationStatus,
            notes: data.notes
        };
    }
}
