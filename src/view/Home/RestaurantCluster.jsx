import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import RestaurantMarker from "./RestaurantMarker";

const RestaurantCluster = ({ items }) => {
    const [markers, setMarkers] = useState([]);
    const map = useMap('test');
    const clusterer = useMemo(() => {
        if (!map) return null;
        return new MarkerClusterer({ map });
    }, [map]);
    
    useEffect(() => {
        if (!clusterer) return;
        clusterer.clearMarkers();
        clusterer.addMarkers(Object.values(markers));
    }, [clusterer, markers]);
    
    const setMarkerRef = useCallback((marker, id) => {
        setMarkers(markers => {
            if ((marker && markers[id]) || (!marker && !markers[id]))
                return markers;
        
            if (marker) {
                return {...markers, [id]: marker};
            } else {
                const {[id]: _, ...newMarkers} = markers;
        
                return newMarkers;
            }
        });
    }, []);
    return (
        <>
            {
                items?.branches?.map(({ id, location }) => {
                    return (
                        <RestaurantMarker
                            id={ id }
                            key={ id }
                            position={ location }
                            setMarkerRef={ setMarkerRef }
                        />
                    )
                })
            }
        </>
    )
}

export default RestaurantCluster;