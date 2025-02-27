
let isOpen = true;

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(createElement);
    });

function createElement(building) {
    //alert(building.building_picture);
    const grid = document.getElementById('grid');
    
    // create a new div / grid box
    const box = document.createElement('div');
    box.classList.add('grid-box');
    grid.appendChild(box);

   /*  // add building images
    const buildingImage = document.createElement('img');
    buildingImage.src = "assets/" + building.building_picture;
    buildingImage.classList.add('buildingImage');
    grid.appendChild(buildingImage); */

    // add building name
    const buildingName = document.createElement('p');
    buildingName.innerText = building.name;
    buildingName.classList.add('grid-text');
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