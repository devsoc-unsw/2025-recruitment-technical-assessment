import React, { useState } from 'react';
import NavbarButton from './NavbarButton';
import DoorLogo from './DoorLogo';

const Navbar = () => {

  return (
    <div className="top-0 left-0 right-0 z-50 px-3 items-center flex justify-between border-b border-[#e6dbdbf0] h-16">
      <div className="flex items-center">
        <DoorLogo />
        <h1 className="ml-2 text-primary text-2xl">Freerooms</h1>
      </div>
      <div className="gap-2 flex">
        <NavbarButton icon="search" />
        <NavbarButton icon="grid_view" />
        <NavbarButton icon="map" />
        <NavbarButton icon="dark_mode" />
      </div>
    </div>
  );
};
  
export default Navbar;