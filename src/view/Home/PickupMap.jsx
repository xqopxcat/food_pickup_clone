import React, { useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { AdvancedMarker, Map, useApiLoadingStatus } from '@vis.gl/react-google-maps';
import useGeolocation from "../../hooks/useGeolocation";
import RestaurantCluster from "./RestaurantCluster";
import styled from 'styled-components';
import { SearchInput } from "../../components";
import { geocodeAddress } from "../../helpers";

const StyledSearchBar = styled.div`
    position: absolute;
    top: 0px;
    width: 100%;
    padding: 16px;
    > input {
        width: 100%;
        border-radius: 500px;
        background-color: ${({ theme }) => theme.colors['bg-white']};
        height: 48px;
        > .container {
            display: flex;
            align-items: center;
            > .icon {
                margin: 0px 16px;
            }
        }
    }
`;

const PickupMap = ({ items, show }) => {
    const [location, getLocation] = useGeolocation();
    const status = useApiLoadingStatus();

    useEffect(() => {
        console.log(status);
    }, [status]);
    
    useEffect(() => {
        getLocation();
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await geocodeAddress(e.target.search.value);
        console.log(result);
    }
    
    return (
        <Map
            mapId='bf51a910020fa25a'
            id='test'
            style={{width: '100vw', height: '50vh', display: show ? 'block' : 'none'}}
            defaultCenter={ location }
            defaultZoom={11}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
        >
            <StyledSearchBar>
                <SearchInput placeholder="輸入地址" onSubmit={ handleSubmit }/>
            </StyledSearchBar>
            <AdvancedMarker
                position={ location }
                title={'AdvancedMarker with customized pin.'}>
                <div
                    style={{
                    width: 16,
                    height: 16,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    background: '#0E8345',
                    border: '2px solid #0e6443',
                    borderRadius: '50%',
                }}></div>
            </AdvancedMarker>
            <RestaurantCluster items={ items } />
        </Map>
    )
}

export default PickupMap;