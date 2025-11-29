// Re-export StatCardData from shared models for backwards compatibility
export type { StatCardData } from '../../../../shared/models/stat-card.models';


export interface QuickAction {
    label: string;
    icon: string;
    action: string;
}

export interface Simulation {
    id: string;
    clientName: string;
    propertyDescription: string;
    propertyAmount: number;
    monthlyPayment: number;
    avatarUrl?: string;
}

export interface BankEntity {
    id: string;
    name: string;
    detail: string;
    rate: number;
    badgeClass: 'badge-green' | 'badge-yellow';
}

export interface CurrentSetting {
    label: string;
    value: string;
    pillClass: 'blue-pill' | 'green-pill' | 'gray-pill';
}
