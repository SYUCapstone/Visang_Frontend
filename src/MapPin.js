import React from 'react' ;

function MapPin({ top, left, label, onClick}) {
    return (
        <div 
        onClick={onClick}
        className="map-pin"
        style={{ top : '%{top}%', left : '%{left}%'}}
        >
            {label}
        </div>
    );
}

export default MapPin;