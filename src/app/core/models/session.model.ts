export interface Session {
    userId: number;
    token: string;
    refreshToken: string;
    expiresAt: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
