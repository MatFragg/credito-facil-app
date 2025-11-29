export interface ActivityDto {
    id: string;
    tipo: 'cliente' | 'vivienda' | 'simulacion';
    descripcion: string;
    fecha: string; // ISO date string from backend
    usuario?: string;
}
