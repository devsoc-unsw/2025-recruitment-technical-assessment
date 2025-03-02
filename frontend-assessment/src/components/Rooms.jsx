import React from 'react';
import data from '../../../frontend/data.json';
import RoomCard from './RoomCard';

const Rooms = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 p-4">
      {data.map((room) => (
        <RoomCard key={room.name} name={room.name} image={room.building_picture} available={room.rooms_available} />
      ))}
    </div>
  );
};
  
export default Rooms;