import { useRef, useState } from 'react';

import type { TopLeftPosition } from './types/geometric.types.ts';
import type { MouseOrTouchEvent } from './types/controller.types.ts';

import { useMouseClickAndMove } from './hooks/use-mouse-click-and-move.ts';
import { Navigatio } from './components/navigatio';

  /* * * * */
  /* * * * */
  /* * * * */
  /* * * * */

function App() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportPosition, setViewpointPosition] = useState<TopLeftPosition>({
    top: 50,
    left: 50,
  });

  const viewportInitialPosition = useRef<TopLeftPosition | null>(null);
  //

  const controllerEventsHandlers = useMouseClickAndMove({
    applyNewPosition(difference: TopLeftPosition) {
      if (!viewportInitialPosition.current) {
        return;
      }
      setViewpointPosition({
        top: viewportInitialPosition.current.top + difference.top,
        left: viewportInitialPosition.current.left + difference.left,
      });
    },
    onStart(event: MouseOrTouchEvent) {
      if (!(event.target instanceof HTMLElement)) {
        throw new Error('Unexpected mouse event target');
      }
      viewportInitialPosition.current = { ...viewportPosition };
    },
    onEnd() {
      viewportInitialPosition.current = null;
    },
  });

  return (
    <div
      style={{
        position: 'relative',
        width: '500px',
        height: '500px',
        overflow: 'hidden',
        background: 'silver',
      }}
      {...controllerEventsHandlers}
    >
      <Navigatio
        viewportPosition={viewportPosition}
        viewportRef={viewportRef}
      >
        <div
          style={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#4b4be6',
          }}
        >1</div>
      </Navigatio>
    </div>
  )
}

export default App
