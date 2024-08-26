import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 88px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-width: 1px;
    background-color: white;
    padding: 16px;
`;

const Footer = ({ children }) => {
  return (
    <Container>
        { children }
    </Container>
  )
}

export default Footer;