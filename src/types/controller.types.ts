import type { TopLeftPosition } from './geometric.types';
import type { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';

  /* * * * */
  /* * * * */
  /* * * * */
  /* * * * */

export type MouseOrTouchEventTargetType = 'content' | 'viewport';

export type MouseOrTouchEvent = TouchEvent | MouseEvent;
export type ReactMouseOrTouchEvent = ReactTouchEvent | ReactMouseEvent;

export type MouseOrTouchEventState = {
  mouseDownPosition: null | TopLeftPosition; // Null if not clicked
  difference: TopLeftPosition;
  isTouchEvent: boolean;
  // initialPosition: TopLeftPosition;
};

export type MouseEventHandlers = {
  onMouseDown: (mouseDownEvent: ReactMouseOrTouchEvent) => void;
};

