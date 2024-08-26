import React from 'react';
import styled from "styled-components";
import Flex from "../Flex";

const StyledContainer = styled.li`
    min-width: 340px;
    padding: 16px;
    margin-right: 10px;
    border-radius: 8px;
    border-width: 3px;
    white-space: nowrap;
`;

const StyledName = styled.span`
    font-size: 16px;
    line-height: 20px;
    white-space: nowrap;
`;

const StyledDescription = styled.span`
    font-size: 14px;
    color: ${({ theme }) => theme.colors['bg-dark-gray']};
`;

const RadioCard = ({ id, name, value, checked, description, onChange }) => {
    
    const handleChange = (e) => {
        onChange(e.target.value);
    }
    
    return (
        <label htmlFor={ id }>
            <StyledContainer style={{ borderColor: checked ? "black" : "#F3F3F3" }}>
                <Flex spaceBetween style={{ marginBottom: 8 }}>
                    <StyledName>{ name }</StyledName>
                    <input 
                        id={ id }
                        type="radio"
                        onChange={ handleChange }
                        value={ value }
                        name="bordered-radio" 
                    />
                </Flex>
                <StyledDescription>{ description }</StyledDescription>
            </StyledContainer>
        </label>
    );
};

export default RadioCard;