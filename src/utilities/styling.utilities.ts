import type { TopLeftPosition } from '../types/basic.types.ts';

export function positionToStyle(position: TopLeftPosition): { top: string; left: string; } {
  return {
    top: `${position.top}px`,
    left: `${position.left}px`,
  }
}
