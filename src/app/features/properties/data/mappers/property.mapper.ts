import { PropertyDto, PaginatedPropertiesDto } from '../dtos/property.dto';
import { CreatePropertyDto } from '../dtos/create-property.dto';
import { UpdatePropertyDto } from '../dtos/update-property.dto';
import { Property, CreatePropertyData, UpdatePropertyData, PaginatedProperties } from '../../domain/models/property.model';
import { PropertyType } from '../../domain/models/property-type.enum';
import { PropertyStatus } from '../../domain/models/property-status.enum';

/**
 * Property Mapper
 * Converts between DTOs and domain models
 */
export class PropertyMapper {
    /**
     * Convert DTO to domain model
     */
    static toModel(dto: PropertyDto): Property {
        return {
            id: dto.id,
            clientId: dto.clientId,
            propertyName: dto.propertyName,
            projectName: dto.projectName,
            propertyCode: dto.propertyCode,
            propertyType: dto.propertyType as PropertyType,
            price: dto.price,
            area: dto.area,
            bedrooms: dto.bedrooms,
            bathrooms: dto.bathrooms,
            parkingSpaces: dto.parkingSpaces,
            ageYears: dto.ageYears,
            address: dto.address,
            district: dto.district,
            province: dto.province,
            city: dto.city,
            status: dto.status as PropertyStatus,
            imageUrl: dto.imageUrl,
            description: dto.description,
            createdAt: new Date(dto.createdAt),
            updatedAt: new Date(dto.updatedAt)
        };
    }

    /**
     * Convert paginated DTO to paginated model
     */
    static toPaginatedModel(dto: PaginatedPropertiesDto): PaginatedProperties {
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
    static toCreateDto(data: CreatePropertyData): CreatePropertyDto {
        return {
            clientId: data.clientId,
            propertyName: data.propertyName,
            projectName: data.projectName,
            propertyType: data.propertyType,
            price: data.price,
            area: data.area,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            parkingSpaces: data.parkingSpaces,
            ageYears: data.ageYears,
            address: data.address,
            district: data.district,
            province: data.province,
            city: data.city,
            status: data.status,
            description: data.description
        };
    }

    /**
     * Convert update data to DTO
     */
    static toUpdateDto(data: UpdatePropertyData): UpdatePropertyDto {
        return {
            clientId: data.clientId,
            propertyName: data.propertyName,
            projectName: data.projectName,
            propertyType: data.propertyType,
            price: data.price,
            area: data.area,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            parkingSpaces: data.parkingSpaces,
            ageYears: data.ageYears,
            address: data.address,
            district: data.district,
            province: data.province,
            city: data.city,
            status: data.status,
            description: data.description
        };
    }
}
