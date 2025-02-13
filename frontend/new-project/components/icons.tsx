import React from 'react';
import { Search, LayoutGrid, Map, Moon } from 'lucide-react';

const IconsSection = () => {
    return (
        <div style= {styles.container}>
            <div style= {styles.iconWrapper}>
                <Search  style = {styles.icon}/>
            </div>

            <div style= {styles.iconWrapper}>
                <LayoutGrid style = {styles.icon} />
            </div>

            <div style={styles.iconWrapper}>
                <Map style = {styles.icon} />
            </div>

            <div style={styles.iconWrapper}>
                <Moon style = {styles.icon} />
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        gap: '10px',
    },
    iconWrapper: {
        width: '100%',
        height: '40px',
        borderRadius: '10px',
        backgroundColor: 'orange',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    icon: {
        color: 'orange',
        fontSize: '14px',
    },
};

export default IconsSection;
