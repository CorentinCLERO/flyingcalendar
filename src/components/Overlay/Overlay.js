import React from 'react';
import './Overlay.css';

const Overlay = ({ overlayIsOpen, setOverlayIsOpen, children, setMeetingSelected }) => {

  function closeOverlay() {
    setOverlayIsOpen(false)
    setMeetingSelected({})
  }
  return (
    overlayIsOpen && (
      <div>
        <div className='app__Overlay__background' onMouseDown={() => closeOverlay()}>
          <div className='app__Overlay__container' onMouseDown={e => e.stopPropagation()}>
            {children}
          </div>
        </div>
      </div>
    )
  );
};

export default Overlay;