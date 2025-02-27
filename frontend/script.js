
let isOpen = true;

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(createElement);
    });

function createElement(building) {
    const grid = document.getElementById('grid');
    
    // creates a new div / grid box 
    const box = document.createElement('div');
    box.classList.add('grid-box');
    grid.appendChild(box);

    // add building images
    let url = building.building_picture;
    url = url.replace("./", "");
    //alert(`url(assets/${url})`);
    box.style.backgroundImage = `url(assets/${url})`;
    box.style.backgroundSize = 'cover';
    box.style.backgroundPosition = 'centre'; 

    // creates box to display rooms avaliable
    const availableBox = document.createElement('div');
    availableBox.classList.add('available-box');
    box.prepend(availableBox);

    // adds availability circle indicator
    const circle = document.createElement('div');
    circle.classList.add('circle');
    if (building.rooms_available > 0) {
        circle.classList.add('green');
    }
    availableBox.appendChild(circle);
        
    // adds availability text
    const avaliablility = document.createElement('p');
    avaliablility.innerText = building.rooms_available + " rooms available"; 
    avaliablility.classList.add('available-text');
    availableBox.appendChild(avaliablility);

    // add building name
    const buildingName = document.createElement('p');
    buildingName.innerText = building.name;
    buildingName.classList.add('building-name');
    box.appendChild(buildingName);
}

function changeLogo() {
    if (isOpen) {
        isOpen = false;
        document.getElementById('logo').src = "assets/freeroomsDoorClosed.png";
        return;
    } 
    isOpen = true;
    document.getElementById('logo').src = "assets/freeroomsLogo.png";
}

document.getElementById('logo').addEventListener('click', changeLogo);