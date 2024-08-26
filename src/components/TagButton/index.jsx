import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 8px 12px;
    border-radius: 500px;
    white-space: nowrap;
    transition-property: all;
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(0,0,1,1);
    background-color: ${({ active, theme }) => active ? 'black' : theme.colors['bg-white']};
    color: ${({ active }) => active && 'white'};
    > .icon {
        display: flex;
        align-items: center;
        margin-right: 8px;
    }
`;

const TagButton = ({ value, icon, active = false, onClick, className, ...props }) => {
    return (
        <StyledButton
            active={ active }
            className={ className } 
            onClick={ onClick }
            {...props}
        >
            {
                icon && (
                    <div className="icon">
                        { icon }
                    </div>
                )
            }
            { value }
        </StyledButton>
    );
};

export default TagButton;