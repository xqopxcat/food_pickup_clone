import React from 'react';
import styled, { css } from 'styled-components'

const Flex = styled.div`
    display: flex;
    ${({ center }) =>
        center &&
        css`
            justify-content: center;
            align-items: center;
    `}
    ${({ spaceBetween }) =>
        spaceBetween &&
        css`
            justify-content: space-between;
            align-items: center;
    `}
    ${({ flexStart }) =>
        flexStart &&
        css`
            justify-content: flex-start;
            align-items: center;
    `}
    ${({ flexEnd }) =>
        flexEnd &&
        css`
            justify-content: flex-end;
            align-items: center;
    `}
    ${({ flexDirection }) =>
        flexDirection &&
        css`
            flex-direction: ${ flexDirection };
    `}
    ${({ gap }) =>
    gap &&
    css`
        gap: ${gap};
    `}
`
export default Flex