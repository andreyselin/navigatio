import { useRef } from 'react';

import type { TopLeftPosition } from '../types/geometric.types';
import type {
  MouseEventHandlers,
  MouseOrTouchEvent,
  MouseOrTouchEventState,
  ReactMouseOrTouchEvent
} from '../types/controller.types';
import { getMouseOrTouchEventPosition, getIsTouchEvent } from '../utilities/controller.utilities';

const defaultState: MouseOrTouchEventState = {
  mouseDownPosition: null,
  isTouchEvent: false,
  difference: {
    top: 0,
    left: 0,
  },
};

type _Params = {
  applyNewPosition: (difference: TopLeftPosition) => void;

  // Initial position of mover object is decided not to be stored inside
  // because there may be several initial positions or non-obvious logic,
  // So this has nothing to return:
  onStart: (mouseDownEvent: MouseOrTouchEvent) => void;
  onEnd: (mouseUpEvent: MouseOrTouchEvent) => void;
}


export function useMouseClickAndMove({
  applyNewPosition,
  onStart,
  onEnd,
}: _Params): MouseEventHandlers {
  const stateRef = useRef<MouseOrTouchEventState>(defaultState);

  function onMouseMove (mouseMoveEvent: MouseOrTouchEvent) {
    mouseMoveEvent.preventDefault();
    mouseMoveEvent.stopPropagation();

    if (stateRef.current.mouseDownPosition === null) {
      return;
    }

    const newPosition = getMouseOrTouchEventPosition(mouseMoveEvent);

    const difference: TopLeftPosition = {
      top: newPosition.top - stateRef.current.mouseDownPosition.top,
      left: newPosition.left - stateRef.current.mouseDownPosition.left,
    }
    stateRef.current = ({ ...stateRef.current, difference });

    // const newTargetPosition: TopLeftPosition = {
    //   top: stateRef.current.targetData.initialPosition.top + difference.top,
    //   left: stateRef.current.targetData.initialPosition.left + difference.left,
    // };

    applyNewPosition(difference);
  }

  function onMouseUp (mouseUpEvent: MouseOrTouchEvent) {
    mouseUpEvent.preventDefault();
    mouseUpEvent.stopPropagation();

    // Deactivate onMouseMove
    stateRef.current = ({ ...stateRef.current, mouseDownPosition: null });

    onEnd(mouseUpEvent);

    if (stateRef.current.isTouchEvent) {
      document.body.removeEventListener('touchmove', onMouseMove);
      document.body.removeEventListener('touchend', onMouseUp);
    } else {
      document.body.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseup', onMouseUp);
    }
  }

  function onMouseDown (reactMouseDownEvent: ReactMouseOrTouchEvent) {
    const mouseDownEvent = reactMouseDownEvent.nativeEvent;

    const isTouchEvent = getIsTouchEvent(mouseDownEvent);

    if (!isTouchEvent) {
      mouseDownEvent.preventDefault();
    }
    mouseDownEvent.stopPropagation();


    stateRef.current = ({
      difference: { top: 0, left: 0 },
      mouseDownPosition: getMouseOrTouchEventPosition(mouseDownEvent),
      isTouchEvent,
    });

    onStart(mouseDownEvent);

    if (isTouchEvent) {
      document.body.addEventListener('touchmove', onMouseMove);
      document.body.addEventListener('touchend', onMouseUp);
    } else {
      document.body.addEventListener('mousemove', onMouseMove);
      document.body.addEventListener('mouseup', onMouseUp);
    }
  }

  // These have to be ReactMouseEvent-based since they are assigned through JSX
  return {
    onMouseDown
  }
}
