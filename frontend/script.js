
let isOpen = true;

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(createElement);
    });

function createElement(building) {
    alert(building.name);
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