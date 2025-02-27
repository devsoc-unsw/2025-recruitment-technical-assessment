
let isOpen = true;

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