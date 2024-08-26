import React, { useEffect } from 'react';
import styled from 'styled-components';
import { disableScroll, enableScroll } from '../../helpers/disableScroll';


const BackContainer = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background-color: rgb(38 38 38 / 0.8);
    ${props => props.state ? 'z-index: 9; opacity: 1' : 'z-index: -1; opacity: 0'}
`;

const Backdrop = ({ state, onClick }) => {
    useEffect(() => {
        if (state) {
            disableScroll();
        }
        return () => {
            enableScroll();
        }
    }, [state]);
    return (
        <BackContainer 
            state={ state }
            onClick={ onClick } 
            className="smooth-transition"
        >
        </BackContainer>
    );
};

export default Backdrop;