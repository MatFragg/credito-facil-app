import { ActivityDto } from "./activity.dto";

// DTOs matching backend API contracts
export interface DashboardStatsDto {
    clientes: ClienteStatsDto;
    viviendas: ViviendaStatsDto;
    simulaciones: SimulacionStatsDto;
    actividadReciente?: ActivityDto[];
}

export interface ClienteStatsDto {
    total: number;
    nuevosEsteMes: number;
    crecimientoMensual: number;
}

export interface ViviendaStatsDto {
    total: number;
    disponibles: number;
    nuevasEstaSemana: number;
}

export interface SimulacionStatsDto {
    totalHoy: number;
    crecimientoHoy: number;
    montoPromedio: number;
    crecimientoPromedio: number;
}
