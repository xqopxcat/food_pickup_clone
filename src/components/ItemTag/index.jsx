import React from 'react';
import { Flex } from '../';
import styled from 'styled-components';

const StyledTag = styled.div`
    display: flex;
    gap: 4px;
    font-size: 14px;
    line-height: 16px;
    padding: 4px 8px;
    background-color: ${({ theme }) => theme.colors['bg-white']};
    color: ${({ theme }) => theme.colors['bg-dark-gray']};
    border-radius: 4px;
`


const ItemTag = ({ text, icon }) => {
    return (
        <Flex>
            <StyledTag>
                { icon && icon }
                { text }
            </StyledTag>
        </Flex>
    );
};

export default ItemTag;