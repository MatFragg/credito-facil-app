import { BaseModel } from "../../shared/models/base.model";
import { Role } from "./role.enum";

/**
 * User model that represents a User entity in Credito Facil application.
 * Matches the backend UserResponse DTO structure.
 * @extends BaseModel
 * @author MattFragg
 */
export interface User extends BaseModel {
    firstName: string;
    lastName: string;
    email: string;
    roles: Role[];
}

