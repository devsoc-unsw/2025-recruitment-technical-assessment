import React, { useState } from 'react';
import './App.css';
import data from './data.json';

function App() {
  
    const navbarStyle={
        backgroundColor: 'white',
        color: 'white',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignIems: 'center',
        fontSize: '20px',
       }
       const navbarStyleUl={
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'right',
        width: '500px',
       }
       const logoStyleA={
        color: 'orange',
        fontSize: '30px',
        textDecoration: 'none',
        width: '50px',
        height: '50px',
       }
       const logoStyleB={
        color: 'orange',
        fontSize: '30px',
        textDecoration: 'none',
        width: '500px',
     
       }

       const [isFreeRooms, setIsFreeRooms] = useState(true);

  return (
    <div>
        <div className="navbar" style={navbarStyle}>
            <div className="tag">
               <div className="logos">
               <img src = {isFreeRooms ? "./assets/freeRoomsLogo.png" : "./assets/freeroomsDoorClosed.png"}
                alt=""  onClick={() => setIsFreeRooms(!isFreeRooms)} style={{cursor:'pointer'}}/>
               <a href="/" style={{textDecoration:'none'}}>
                        <div>
                    <h3 style={{color:'orange'}}>Freerooms</h3>
                    </div>
                    </a>
                </div>
                
            </div>
            <div style={navbarStyleUl}>
           <div> <a href="#"><img src="./assets/search-icon.png" alt="Freeroom Logo" style={logoStyleA} /></a></div>
           <div><a href="#"><img src="./assets/gridview-icon.png" alt="Freeroom2 Logo" style={logoStyleA} /></a></div>
           <div><a href="#"><img src="./assets/map-icon.png" alt="Freeroom3 Logo" style={logoStyleA} /></a></div>
           <div><a href="#"><img src="./assets/darkmode-icon.png" alt="Freeroom4 Logo" style={logoStyleA} /></a></div>
          </div>
        </div>

        <div className="navbar2" style={navbarStyle}>
        <div className="tag">
               <div className="logos">
               <img src = "./assets/filteralt-icon.png" alt="" />
               <a href="/" style={{textDecoration:'none'}}>
                        <div>
                    <h3 style={{color:'orange'}}>Filters</h3>
                    </div>
                    </a>
                </div>
       </div>

        <div>
        <img src="./assets/search-icon.png" alt="Freeroom Logo" style={logoStyleA} />
        <input type="text" placeholder="Search for a building..." style={logoStyleB}/>
        </div>

        <div className="tag">
               <div className="logos">
               <img src = "./assets/filterlist-icon.png" alt="" />
               <a href="/" style={{textDecoration:'none'}}>
                        <div>
                    <h3 style={{color:'orange'}}>Sort</h3>
                    </div>
                    </a>
                </div>
       </div>

       </div>
       
        <div className="building-list">
            {data.map((building, index) => (
            <div key={index} className="building-card">
                <div className='building-name'>{building.name}</div>
                <img className="building-image" src={`./assets/${building.building_picture}`} alt={building.name} />
                <div className="rooms-available">Rooms Available: {building.rooms_available}</div>
            </div>
            ))}
        </div>
    </div>
  );
}

export default App;