// Domain models - Framework-agnostic business entities

export interface DashboardStats {
    clientes: ClienteStats;
    viviendas: ViviendaStats;
    simulaciones: SimulacionStats;
    actividadReciente?: Activity[];
}

export interface ClienteStats {
    total: number;
    nuevosEsteMes: number;
    crecimientoMensual: number;
}

export interface ViviendaStats {
    total: number;
    disponibles: number;
    nuevasEstaSemana: number;
}

export interface SimulacionStats {
    totalHoy: number;
    crecimientoHoy: number;
    montoPromedio: number;
    crecimientoPromedio: number;
}

export interface Activity {
    id: string;
    tipo: 'cliente' | 'vivienda' | 'simulacion';
    descripcion: string;
    fecha: Date; // Domain uses Date object, not string
    usuario?: string;
}
