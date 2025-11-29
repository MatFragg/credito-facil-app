import { Observable } from "rxjs";
import { AuthResponse, Credentials, RegisterData } from "../models/auth.models";

export abstract class AuthRepository {
    abstract login(credentials: Credentials): Observable<AuthResponse>;
    abstract register(data: RegisterData): Observable<AuthResponse>;
}