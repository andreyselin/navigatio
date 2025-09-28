import type { FC, ReactNode, RefObject } from 'react';

import type { TopLeftPosition } from '../../types/basic.types.ts';
import { positionToStyle } from '../../utilities/styling.utilities.ts';

import styles from './navigation.module.scss';

  /* * * * */
  /* * * * */
  /* * * * */

type NavigatioProps = {
  children: ReactNode;
  viewportPosition: TopLeftPosition;
  viewportRef: RefObject<HTMLDivElement | null>;
  // mouseEventHandlers: Record<string, string>; // MouseEventHandlers;
}

export const Navigatio: FC<NavigatioProps> = ({
  children,
  viewportPosition,
  viewportRef,
  // mouseEventHandlers = {},
}) => {
  return (
    <div className={styles.navigatioContainer}>
      <div
        className={styles.graphContextNavigator}
        ref={viewportRef}
        // {...mouseEventHandlers}
        // onTouchStart={mouseEventHandlers.onMouseDown}
      >
        <div
          className={styles.navigatioCanvas}
          style={positionToStyle(viewportPosition)}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
