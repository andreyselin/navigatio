import type { TopLeftPosition } from '../types/geometric.types';

export function getIsTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
  return 'touches' in event;
}

export function getMouseOrTouchEventPosition(event: MouseEvent | TouchEvent): TopLeftPosition {
  return getIsTouchEvent(event)
    ? {
      top: event.touches[0].clientY,
      left: event.touches[0].clientX,
    }
    : {
      top: event.clientY,
      left: event.clientX,
    }
}
