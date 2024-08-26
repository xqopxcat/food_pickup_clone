import React, { useState } from 'react';
import { Backdrop, SelectButton, Button } from '../';
import styled from 'styled-components';

const StyledContainer = styled.div`
    position: fixed;
    width: 100%;
    left: 0px;
    background-color: white;
    z-index: 10;
    border-radius: 16px 16px 0 0;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.22,1,0.36,1);
    transition-duration: 600ms;
    bottom: ${({ mobileMenuOpen }) => mobileMenuOpen ? '0' : '-100%'};
    > .title {
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 24px;
        font-size: 18px;
        border-bottom-width: 2px;
        border-color: ${({ theme }) => theme.colors['bg-white']};
        height: 64px
    }
    > .button-container {
        width: 100%;
        padding: 16px;
    }
`

const SelectPanel = ({ title, selectType, onClick, onReset, icon, className, children }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const handleClick = () => {
        setMobileMenuOpen(false);
        onClick();
    }
    const handleReset = () => {
        setMobileMenuOpen(false);
        onReset();
    }
    
    return (
        <>
            <SelectButton
                icon={ icon }
                className={ className }
                onClick={ () => setMobileMenuOpen(!mobileMenuOpen) }
                value={ selectType }
            />
            <>
                <Backdrop state={ mobileMenuOpen } onClick={() => setMobileMenuOpen(false)} />
                <StyledContainer mobileMenuOpen={ mobileMenuOpen }>
                    <h2 className="title">{ title }</h2>
                    { children }
                    <div className="button-container">
                        <Button title="套用" textSize="medium" onClick={ handleClick } style={{ width: '100%'}}/>
                        <Button title="重設" textSize="medium" outline onClick={ handleReset } style={{ width: '100%', marginTop: '8px' }} />
                    </div>
                </StyledContainer>
            </>
        </>
    );
};

export default SelectPanel;