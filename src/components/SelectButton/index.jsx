import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import styled from 'styled-components';

const StyledButton = styled.button`
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 8px 12px;
    background-color: ${ p => p.theme.colors['bg-white'] };
    border-radius: 500px;
    white-space: nowrap;
`;

const SelectButton = ({ className, icon, onClick, value }) => {
    return (
        <StyledButton
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown" 
            className={ className } 
            type="button"
            onClick={ onClick }
        >
            {
                icon && (
                    <div style={ { marginRight: '8px' } }>
                        { icon }
                    </div>
                )
            }
            { value }
            <FiChevronDown style={ { marginInlineStart: '8px' } } />
        </StyledButton>
    )
}

export default SelectButton;