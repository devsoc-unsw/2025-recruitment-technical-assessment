

import { useState } from 'react';
import freeroomsDoorClosed from "../assets/freeroomsDoorClosed.png"
import freeRoomsLogo from "../assets/freeRoomsLogo.png";
import "../styles/Header.css"



function Header() {

    const [doorOpened, setDoorOpened] = useState(true);

    function changeDoor() {
        setDoorOpened(prevState => !prevState);
    }

    return (
        <>
            <div className="header">
                <div className="row-one">
                    <div className="left">
                        <img 
                            src={doorOpened ? freeRoomsLogo : freeroomsDoorClosed}
                            alt="FreeRooms Logo"
                            onClick={changeDoor} 
                        />

                        <span>Freerooms</span>
                    </div>

                    <div className="right">
                        <button>Button 1</button>
                        <button>Button 2</button>
                        <button>Button 3</button>
                        <button>Button 4</button>
                    </div>
                </div>

                <div className="row-two">
                    <button>Filters</button>
                    <input type="text" placeholder="Search for a building"></input>
                    <button>Sort</button>
                </div>
            </div>
        </>
    )
}


export default Header;