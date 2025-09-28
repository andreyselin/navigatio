import { TopLeftPosition } from '../types/geometric.types';

export function positionToStyle(position: TopLeftPosition): { top: string; left: string; } {
  return {
    top: `${position.top}px`,
    left: `${position.left}px`,
  }
}
