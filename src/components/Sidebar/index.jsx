import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiShoppingCart } from 'react-icons/fi';
import styled from 'styled-components';
import { Flex, Backdrop } from '../'
import {
    logo
} from '../../assets';

const Header = styled.header`
    .w-full {
        width: 100%;
    }
    .header-container {
        margin: 0 10px 0 -6px
    }
`;

const StyledFiMenu = styled(FiMenu)`
    width: 20px;
    height: 20px;
`;

const StyledFiShoppingCart = styled(FiShoppingCart)`
    width: 20px;
    height: 20px;
`;

const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    width: 36px;
`;

const StyledCart = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -2px;
    right: -2px;
    border-radius: 24px;
    width: 20px;
    height: 20px;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    color: white;
    background: ${ p => p.theme.colors['bg-green'] }
`;

const SidePanel = styled.div`
    position: fixed;
    width: 300px;
    z-index: 10;
    top: 0px;
    height: 100vh;
    ${ props => props.menuOpen ? 'left: 0px; opacity: 1;' : 'left: -100%; opacity: 0;'}
    .aside {
        display: flex;
        flex-direction: column;
        gap: 8px;
        height: 100%;
        background: white;
        padding: 24px;
        @media (min-width: 768px) {
            display: none;
        }
        --tw-shadow: 0 0 25px rgba(0,0,0,.1);
        --tw-shadow-colored: 0 0 25px var(--tw-shadow-color);
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
        flex flex-col gap-2 h-full shadow-[0_0_25px_rgba(0,0,0,0.1)] bg-white p-6 md:hidden
    }    
`



const Sidebar = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const onItemClick = () => {
        setMobileMenuOpen(false)
    }
    
    return (
        <>
            <Header>
                <div className="w-full">
                    <Flex flexStart style={{ height: '48px', padding: '0 16px' }}>
                        <div className="header-container">
                            <StyledButton type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                                <StyledFiMenu />
                            </StyledButton>
                        </div>
                        <img height="16px" src={ logo } alt="logo" onClick={() => navigate('/')}/>
                        <div style={{ flex: '1 1 0%' }}></div>
                        <div style={ { marginLeft: '8px' } }>
                            <StyledButton onClick={() => navigate('/cart')} style={ { position: 'relative' } }>
                                <StyledFiShoppingCart />
                                {
                                    JSON.parse(localStorage.getItem('order')) && JSON.parse(localStorage.getItem('order')).length > 0 && (
                                        <StyledCart>
                                            { JSON.parse(localStorage.getItem('order')).length }
                                        </StyledCart>
                                    )
                                }
                            </StyledButton>
                        </div>
                    </Flex>
                </div>
            </Header>
            <Backdrop state={ mobileMenuOpen } onClick={() => setMobileMenuOpen(false)} />
            <SidePanel menuOpen={ mobileMenuOpen } className="smooth-transition">
                <aside className="aside">
                    <Link onClick={ onItemClick } to="/">Home</Link>
                    <Link onClick={ onItemClick } to="/payment">Payment</Link>
                </aside>
            </SidePanel>
        </>
    )
}

export default Sidebar;