import { FC, useRef, useState } from 'react';

import type { MouseOrTouchEvent, TopLeftPosition } from './types';
import { useMouseClickAndMove } from './hooks/use-mouse-click-and-move';
import { Navigatio } from './components/navigatio';

  /* * * * */
  /* * * * */
  /* * * * */
  /* * * * */

type ShortcutMovementParams = {
  shortcutId: string;
  initialPosition: TopLeftPosition;
}

type Movable = {
  id: string;
  position: TopLeftPosition;
}

type Shortcut = Movable & {
  text: string;
  // Other shortcut props
}

const initialShortcuts: Shortcut[] = [
  {
    id: '9e102982-c5ed-48aa-9a98-9dd3bd04b279',
    position: { top: 100, left: 100 },
    text: 'Shortcut 1',
  },
  {
    id: 'bbdcd3ed-1949-4f6f-a675-46b4ed80a9bb',
    position: { top: 300, left: 200 },
    text: 'Shortcut 2',
  },
];

export const App: FC = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportPosition, setViewpointPosition] = useState<TopLeftPosition>({
    top: 50,
    left: 50,
  });

  // State where we store and update shortcuts data, including live positions while dragging.
  const [shortcuts, setShortcuts] = useState<Shortcut[]>(initialShortcuts);

  const shortcutMovementParams = useRef<ShortcutMovementParams | null>(null);
  const shortcutClickParams = useRef<{ shortcut: Shortcut } | null>(null);
  const viewportInitialPosition = useRef<TopLeftPosition | null>(null);

  const controllerEventsHandlers = useMouseClickAndMove({
    applyNewPosition(difference: TopLeftPosition) {
      // Moving shortcut
      if (shortcutMovementParams.current) {
        const { initialPosition } = shortcutMovementParams.current;
        setShortcuts(prevShortcuts =>
          prevShortcuts.map(shortcut =>
            shortcut.id === shortcutMovementParams.current!.shortcutId
              ? {
                  ...shortcut,
                  position: {
                    top:  initialPosition.top  + difference.top,
                    left: initialPosition.left + difference.left,
                  },
                }
              : shortcut
          )
        );
        return;
      }
      
      // Moving viewport
      if (viewportInitialPosition.current) {
        setViewpointPosition({
          top:  viewportInitialPosition.current.top  + difference.top,
          left: viewportInitialPosition.current.left + difference.left,
        });
        return;
      }

      console.warn('Received position difference, but no movement is in progress');
      
    },
    onStart(event: MouseOrTouchEvent) {
      if (!(event.target instanceof HTMLElement)) {
        throw new Error('Unexpected mouse event target');
      }
      
      if (event.target.dataset.bodyShortcutId) {
        const shortcut = shortcuts.find(shortcut => shortcut.id === event.target.dataset.bodyShortcutId);
        if (!shortcut) {
          throw new Error('Shortcut not found');
        }
        shortcutClickParams.current = { shortcut };
        return;
      }

      // Initiate moving shortcut
      if (event.target.dataset.movableShortcutId) {
        console.log('--!--', event.target.dataset.movableShortcutId);
        const shortcut = shortcuts
          .find(shortcut => shortcut.id === event.target.dataset.movableShortcutId);

        if (!shortcut) {
          throw new Error('Shortcut not found');
        }

        shortcutMovementParams.current = {
          shortcutId: shortcut.id,
          initialPosition: { ...shortcut.position },
        };

        return;
      }

      // Initiate moving viewport
      viewportInitialPosition.current = { ...viewportPosition };
    },
    onEnd(event: MouseOrTouchEvent) {
      if (shortcutClickParams.current) {
        if (event.target.dataset.bodyShortcutId === shortcutClickParams.current.shortcut.id) {
          // If click is released on the same shortcut where it was initiated
          // Todo: do go shortcut
          console.log('Opening shortcut', shortcutClickParams.current.shortcut);
        }
        shortcutClickParams.current = null;
      }
      if (shortcutMovementParams.current) {
        shortcutMovementParams.current = null;
      }
      if (viewportInitialPosition.current) {
        viewportInitialPosition.current = null;
      }
    },
  });

  return (
    <div
      style={{
        position: 'relative',
        width: '100dvw',
        height: '100dvh',
        overflow: 'hidden',
        background: 'silver',
      }}
      {...controllerEventsHandlers}
      onTouchStart={controllerEventsHandlers.onMouseDown}
    >
      <Navigatio
        viewportPosition={viewportPosition}
        viewportRef={viewportRef}
      >

        {
          shortcuts.map(shortcut => (
            <div
              key={shortcut.id}
              style={{
                position: 'absolute',
                top: shortcut.position.top,
                left: shortcut.position.left,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                background: '#4b4be6',
              }}
            >
              <div
                data-body-shortcut-id={shortcut.id}
              >{shortcut.text}</div>
              <div
                data-movable-shortcut-id={shortcut.id}
              >Move</div>
            </div>
          ))
        }

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
