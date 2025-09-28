import { useRef} from 'react';

import { Navigatio } from './components/navigatio';
import type { TopLeftPosition } from './types/basic.types.ts';

  /* * * * */
  /* * * * */
  /* * * * */
  /* * * * */

function App() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const viewportPosition: TopLeftPosition = {
    top: 50,
    left: 50,
  }
  return (
    <div>
      <Navigatio
        viewportPosition={viewportPosition}
        viewportRef={viewportRef}
        mouseEventHandlers={{}}
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
