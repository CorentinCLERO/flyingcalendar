import React from 'react';
import './Overlay.css';

const Overlay = ({ overlayIsOpen, setOverlayIsOpen, children }) => {
  return (
    <>
      {
        overlayIsOpen && (
          <div className='app__Overlay__background' onClick={() => setOverlayIsOpen(false)}>
            <div className='app__Overlay__container'>
              {children}
            </div>
          </div>
        )
      }
    </>
  );
};

export default Overlay;