import { BankEntity } from '../../domain/models/bank-entity.model';

/**
 * State interface for Bank Entities feature
 */
export interface BankEntitiesState {
    entities: BankEntity[];
    selectedEntity: BankEntity | null;
    comparisonEntities: BankEntity[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
}

/**
 * Initial state
 */
export const initialBankEntitiesState: BankEntitiesState = {
    entities: [],
    selectedEntity: null,
    comparisonEntities: [],
    loading: false,
    error: null,
    searchQuery: '',
};
