/**
 * Bonus Type Enum
 * Matches backend BonusType enum
 */
export enum BonusType {
    ACQUISITION = 'ACQUISITION',
    CONSTRUCTION = 'CONSTRUCTION',
    IMPROVEMENT = 'IMPROVEMENT',
    PBP_STANDARD = 'PBP_STANDARD',  // Premio al Buen Pagador - Standard
    PBP_PLUS = 'PBP_PLUS'            // Premio al Buen Pagador - Plus
}

/**
 * Bonus Type Display Labels (Spanish)
 */
export const BonusTypeLabels: Record<BonusType, string> = {
    [BonusType.ACQUISITION]: 'Adquisición',
    [BonusType.CONSTRUCTION]: 'Construcción',
    [BonusType.IMPROVEMENT]: 'Mejoramiento',
    [BonusType.PBP_STANDARD]: 'PBP Standard',
    [BonusType.PBP_PLUS]: 'PBP Plus'
};

/**
 * Bonus Type Max Amounts
 */
export const BonusTypeMaxAmounts: Record<BonusType, number> = {
    [BonusType.ACQUISITION]: 37800,
    [BonusType.CONSTRUCTION]: 28400,
    [BonusType.IMPROVEMENT]: 18900,
    [BonusType.PBP_STANDARD]: 6400,   // S/ 6,400
    [BonusType.PBP_PLUS]: 17700       // S/ 17,700
};

/**
 * Get all bonus type options for dropdown
 */
export function getBonusTypeOptions(): { value: BonusType; label: string; maxAmount: number }[] {
    return Object.values(BonusType).map(value => ({
        value,
        label: BonusTypeLabels[value],
        maxAmount: BonusTypeMaxAmounts[value]
    }));
}
