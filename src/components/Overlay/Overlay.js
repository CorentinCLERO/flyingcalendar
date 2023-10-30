import React from 'react';
import './Overlay.css';

const Overlay = ({ overlayIsOpen, setOverlayIsOpen, children }) => {
  return (
    <>
      {
        overlayIsOpen && (
          <div>
            <div className='app__Overlay__background' onMouseDown={() => setOverlayIsOpen(false)}>
              <div className='app__Overlay__container' onMouseDown={e => e.stopPropagation()}>
                {children}
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Overlay;