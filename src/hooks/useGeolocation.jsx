import React, { useState } from 'react'

const useGeolocation = () => {
    const [userLocation, setUserLocation] = useState(null);
    
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude })
                },
                (error) => {
                    alert('Error getting user location:', error);
                }
            );
        }
        else {
            alert('Geolocation is not supported by this browser.');
        }
    }
    return [
        userLocation,
        getUserLocation
    ]
}

export default useGeolocation;