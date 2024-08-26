import React, { useState } from 'react';
import styled from 'styled-components';

const StyledTabs = styled.ul`
    display: flex;
    align-items: center;
    height: 36px;
    background-color: ${({ theme }) => theme.colors['bg-light-gray']};
    border-radius: 500px;
    white-space: nowrap;
`;

const StyledItem = styled.li`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 12px;
    font-size: 14px;
    align-items: ${({ selected }) => selected ? 'center' : ''};
    height: ${({ selected }) => selected ? '100%' : ''};
    background-color: ${({ selected }) => selected ? 'white' : ''};
    border-radius: ${({ selected }) => selected ? '500px' : ''};
    box-shadow: ${({ selected }) => selected ? '0 0 5px 0 rgba(0,0,0,.14)' : ''};
`;

const TabSwitch = ({ items }) => {
    const [selected, setSelected] = useState(items[0].value);
    
    const handleClick = (value) => {
        setSelected(value);
    };
    
    return (
        <StyledTabs>
            {
                items.map(({ title, value }) => {
                    return (
                        <StyledItem 
                            value={ value }
                            onClick={ () => handleClick(value) }
                            selected={ selected === value } key={ title }
                        >
                            { title }
                        </StyledItem>
                    )
                })
            }
            {/* <li className="w-full flex justify-center items-center h-full bg-white rounded-[500px] border shadow-[0_0_5px_0_rgba(0,0,0,0.14)] ">
                Left
            </li>
            <li className="w-full flex justify-center">
                Right
            </li> */}
        </StyledTabs>
    )
}

export default TabSwitch;