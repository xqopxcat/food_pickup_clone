import React, { useState } from 'react';
import { Backdrop, SelectButton, Button } from '../';
import styled from 'styled-components';

const SelectContainer = styled.div`
    position: absolute;
    width: 100%;
    background-color: white;
    z-index: 10;
    bottom: 0;
    .select-title {
        display: flex;
        height: 64px;
        justify-content: center;
        align-items: center;
        line-height: 24px;
        font-size: 18px;
        border-bottom-width: 2px;
        border-color: ${ p => p.theme.colors['bg-white'] };
    }
    .select-button-container {
        width: 100%;
        padding: 0 16px 32px;
    }
`

const Dropdown = ({ title, selectValue, selectType, onClick, className, children }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const handleClick = () => {
        setMobileMenuOpen(false);
        onClick();
    }
    
    return (
        <>
            <SelectButton
                className={ className }
                onClick={ () => setMobileMenuOpen(!mobileMenuOpen) }
                value={ selectType }
            />
            {
                mobileMenuOpen && (
                    <>
                        <Backdrop state={ mobileMenuOpen } onClick={() => setMobileMenuOpen(false)} />
                        <SelectContainer id="dropdown">
                            <h2 className="select-title">{ title }</h2>
                            { children }
                            <div className="select-button-container">
                                <Button title={`確認${selectValue}`} onClick={ handleClick } style={{ width: '100%' }}/>
                            </div>
                        </SelectContainer>
                    </>
                )
            }
        </>
    );
}

export default Dropdown