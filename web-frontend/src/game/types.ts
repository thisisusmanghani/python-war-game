export type Item = 'rocks' | 'iron-ore' | 'wood' | 'leather' | 'water' | 'steel' | 'charcoal';
export type Weapon = 'sword' | 'cross-guard' | 'helmet';

export type Direction = 'forward' | 'backward' | 'left' | 'right';

export interface GameNode {
  id: number;
  name: string;
  description: string;
  items: Item[]; // Items available to pick up at this location
  connections: Partial<Record<Direction, number>>; // Map direction to Node ID
}

export interface PlayerState {
  name: string;
  currentPosId: number;
  inventory: Item[];
  weapons: Weapon[];
  hydration: number;
  hp: number; // New HP field
  isGameOver: boolean;
  gameWon: boolean;
  message: string;
}

export const INITIAL_HYDRATION = 10;
export const MAX_HP = 100;
