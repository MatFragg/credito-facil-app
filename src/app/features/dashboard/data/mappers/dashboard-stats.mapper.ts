import { DashboardStatsDto, ClienteStatsDto, ViviendaStatsDto, SimulacionStatsDto } from '../dtos/dashboard-stats.dto';
import { ActivityDto } from '../dtos/activity.dto';
import { DashboardStats, ClienteStats, ViviendaStats, SimulacionStats, Activity } from '../../domain/models/dashboard-stats.model';

/**
 * Converts dashboard stats DTO from backend to domain model
 */
export function dashboardStatsDtoToModel(dto: DashboardStatsDto): DashboardStats {
    return {
        clientes: clienteStatsDtoToModel(dto.clientes),
        viviendas: viviendaStatsDtoToModel(dto.viviendas),
        simulaciones: simulacionStatsDtoToModel(dto.simulaciones),
        actividadReciente: dto.actividadReciente?.map(activityDtoToModel) || []
    };
}

function clienteStatsDtoToModel(dto: ClienteStatsDto): ClienteStats {
    return {
        total: dto.total,
        nuevosEsteMes: dto.nuevosEsteMes,
        crecimientoMensual: dto.crecimientoMensual
    };
}

function viviendaStatsDtoToModel(dto: ViviendaStatsDto): ViviendaStats {
    return {
        total: dto.total,
        disponibles: dto.disponibles,
        nuevasEstaSemana: dto.nuevasEstaSemana
    };
}

function simulacionStatsDtoToModel(dto: SimulacionStatsDto): SimulacionStats {
    return {
        totalHoy: dto.totalHoy,
        crecimientoHoy: dto.crecimientoHoy,
        montoPromedio: dto.montoPromedio,
        crecimientoPromedio: dto.crecimientoPromedio
    };
}

export function activityDtoToModel(dto: ActivityDto): Activity {
    return {
        id: dto.id,
        tipo: dto.tipo,
        descripcion: dto.descripcion,
        fecha: new Date(dto.fecha), // Convert ISO string to Date object
        usuario: dto.usuario
    };
}
