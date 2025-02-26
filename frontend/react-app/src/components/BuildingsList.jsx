import data from "../data.json"

import "../styles/BuildingsList.css"

function BuildingsList() {
    console.log(data[0].building_picture)
    const agsmImg = data[0].building_picture
    return (
        <div className="buildings-container">
            <div className="building" style={{ backgroundImage: `url(${agsmImg})` }}></div>
            <div>hi</div>
        </div>
    )
}

export default BuildingsList