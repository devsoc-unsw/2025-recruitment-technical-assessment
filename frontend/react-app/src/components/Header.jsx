import freeRoomsLogo from "../assets/freeRoomsLogo.png";
import "../styles/Header.css"

function Header() {

    return (
        <>
            <div className="header">
                <div className="row-one">
                    <div className="left">
                        <img src={freeRoomsLogo}></img>
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