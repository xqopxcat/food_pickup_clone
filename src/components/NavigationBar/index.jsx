import React, { useState } from 'react';
import styled from 'styled-components';

const StyledItem = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-width: 72px;
    > .item {
        max-height: 64px;
        margin-bottom: 4px;
    }
    > .title {
        font-size: 12px;
    }
`;

const StyledImage = styled.img`
    width: 64px;
    height: 64px;
    border-radius: 100%;
    transform: ${({ active }) => active && 'rotate(20deg)'}
    background-color: ${({ active }) => active && '#d3efda'}
`;

const NavigationItem = ({ title, icon, active, onClick }) => {
    return (
        <StyledItem 
            onClick={ () => {
                if (active) return onClick()
                return onClick(title)
            } }
        >
            <div className="item">
                <StyledImage
                    className="smooth-transition "
                    alt=""
                    role="presentation"
                    src={ icon }
                    active={ active }
                />
            </div>
            <span
                className="title"
                data-testid="rich-text"
            >
                { title }
            </span>
        </StyledItem>
    )
}

const StyledNav = styled.nav`
    overflow-y: auto;
    padding: 4px 0px 2px 8px;
    .list {
        display: flex;
        flex-direction: row;
        gap: 4px;
    }
`;

const NavigationBar = ({ items, children, onClick }) => {
    const [activeType, setActiveType] = useState();
    
    const handleItemClick = (value) => {
        setActiveType(value);
        onClick(value);
    }
    
    return (
        <StyledNav className="no-scrollbar">
            <ul className="list">
                {
                    children ?? items.map(({ title, icon}) => {
                        return <NavigationItem key={ title } title={ title } icon={ icon } active={ title === activeType } onClick={ handleItemClick } />
                    })
                }
            </ul>
        </StyledNav>
    );
};

export default NavigationBar;