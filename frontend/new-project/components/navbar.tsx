import React from 'react';
import IconsSection from "./icons";

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <div style = {styles.logo}>
                <img
                src = "/frontend/assets/freeRoomsLogo.png"
                alt = "Logo"
                style = {styles.logoImage}/>
            </div>

            <div style={styles.appName}>Freerooms</div>

            <IconsSection />
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'center',
        alightItems: 'center',
        padding: '10px 20px',
        backgroundColor: 'white',
        color: 'white',
    },
    logo: {
        display: 'inline-block',
        alightItems: 'center',
    },
    logoImage: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
    },
    appName: {
        fontSize: '16px',
        fontWeight: 'bold',
    },
};

export default Navbar;