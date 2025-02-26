import data from "../data.json"

import "../styles/BuildingsList.css"

function BuildingsList() {

    const buildings = data.map(x => {
        return (
            <div className="building" style={{ backgroundImage: `url(${x.building_picture})` }}>
                <div className="rooms-available-container">
                    <div className="rooms-available">
                        <p>
                            {x.rooms_available} rooms available
                        </p>
                    </div>
                </div>
                <div className="building-name">
                    {x.name}
                </div>
            </div>
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