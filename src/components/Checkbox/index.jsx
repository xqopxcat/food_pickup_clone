import React from 'react';
import { FaCheck } from 'react-icons/fa6';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const StyledCheckbox = styled.input`
    position: relative;
    flex-shrink: 0;
    appearance: none;
    width: 20px;
    height: 20px;
    border-width: 3px;
    border-color: ${ p => p.theme.colors['bg-dark-gray']};
    border-radius: 0px;
    background-color: white;
    &:checked {
        background-color: black;
        border-width: 0px;
    }
`;

const StyledLabel = styled.label`
    margin-inline-start: 24px;
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
`;

const StyledIcon = styled(FaCheck)`
    position: absolute;
    display: none;
    pointer-events: none;
    width: 20px;
    height: 20px;
    padding: 4px;
    color: white;
    .peer:checked ~ .peer-checked\:block {
        display: block;
    }
    
`

const Checkbox = ({ name, title, value, ...props }) => {
    return (
        <Container>
            <StyledCheckbox
                id={ name } 
                type="checkbox"
                value={ value }
                className="peer"
                {...props}
            />
                {
                    title && (
                        <StyledLabel htmlFor={ name }>{ title }</StyledLabel>
                    )
                }
            <StyledIcon />
        </Container>
    );
};

export default Checkbox;