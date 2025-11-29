import { User } from './user.model';

/**
 * Authentication response model matching backend AuthResponse DTO.
 * @author MattFragg
 */
export interface AuthResponse {
    token: string;
    type: string;
    user: User;
}
