import React, { useState } from 'react';
import logo from '../../../frontend/assets/freeRoomslogo.png';
import closedLogo from '../../../frontend/assets/freeRoomsDoorClosed.png';

const DoorLogo = () => {
  const [ isOpen, setIsOpen ] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <div onClick={toggle}>
        <img 
        src={isOpen ? logo : closedLogo} 
        alt={isOpen ? 'logo' : 'closedLogo'}
        className="h-[50px] w-[50px]" 
        />
      </div>
    </div>
  )
};

export default DoorLogo;