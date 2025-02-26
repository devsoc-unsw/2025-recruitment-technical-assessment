import data from "../data.json"

import "../styles/BuildingsList.css"

function BuildingsList() {

    const buildings = data.map(x => {
        return (
            <div className="building" style={{ backgroundImage: `url(${x.building_picture})` }}></div>
        )
    })

    console.log(data[0].building_picture)
    const agsmImg = data[0].building_picture
    return (
        <div className="buildings-container">
            {buildings}
        </div>
    )
}

export default BuildingsList