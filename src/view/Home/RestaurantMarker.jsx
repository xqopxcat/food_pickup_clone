import React, { useCallback } from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { RiRestaurantFill } from "react-icons/ri";

const RestaurantMarker = ({ id, position, setMarkerRef }) => {
    const ref = useCallback(
        (marker) =>
            setMarkerRef(marker, id),
        [setMarkerRef, id]
    );
    return (
        <AdvancedMarker
            ref={ ref }
            position={ position }
            title={'AdvancedMarker with customized pin.'}>
            <div
                style={{
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                background: '#FFFFFF',
                borderRadius: '200px',
                boxShadow: 'rgba(0, 0, 0, 0.12) 0px 4px 16px'
            }}>
                <RiRestaurantFill
                    style={{
                        width: 16,
                        height: 16,
                    }}
                />
            </div>
        </AdvancedMarker>
    )
}

export default RestaurantMarker;