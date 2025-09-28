import type { TopLeftPosition } from './geometric.types';

export type MouseOrTouchEventTargetType = 'content' | 'viewport';

export type MouseOrTouchEvent = TouchEvent | MouseEvent;

export type MouseOrTouchEventState = {
  mouseDownPosition: null | TopLeftPosition; // Null if not clicked
  difference: TopLeftPosition;
  isTouchEvent: boolean;
  // initialPosition: TopLeftPosition;
};


// Todo: rename to MouseOrTouchEventTargetType, but first
//  figure out if touch events are able to merge with mouse events
export type MouseEventHandlers = {
  onMouseDown: (mouseDownEvent: MouseOrTouchEvent) => void;
};

