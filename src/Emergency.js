import React from 'react';
import MapPin from './MapPin';

function Emergency({ openModal }) {
    return (
        <div className="map-container">
            <span className='current-status'>현재 표시중 : 응급실</span>
            {/* Map Pin 관련 예시 코드*/}
            <MapPin top={30} left={40} label="1" onClick={() => openModal('연세 세브란스병원')} />
        </div>
    );
}

export default Emergency;