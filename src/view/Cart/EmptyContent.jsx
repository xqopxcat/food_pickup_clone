import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaXmark } from 'react-icons/fa6';
import styled from 'styled-components';
import { Button, Flex } from '../../components';
import cart from '../../assets/cart.svg';

export const StyledFaXmark = styled(FaXmark)`
    width: 20px;
    height: 20px;
`;

const StyledContainer = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: calc(-124px + 100vh);
    background-color: white;
    padding: 12px 16px;
    > .back {
        position: fixed;
        z-index: 50;
        top: 8px;
        left: 8px;
        padding: 16px;
        background-color: ${({ theme }) => theme.colors['bg-white']};
        border-radius: 9999px;
    }
`;

const StyledFlex = styled(Flex)`
    height: 100%;
    > .description {
        font-size: 20px;
        line-height: 28px;
        font-weight: 700;
        margin-bottom: 12px;
    }
    > .description-ext {
        font-size: 16px;
        text-align: center;
        color: ${({ theme }) => theme.colors['bg-dark']};
        line-height: 24px;
        max-width: 80%;
        margin-bottom: 36px;
    }
    > .empty-btn {
        height: 36px;
        font-size: 14px;
        line-height: 16px;
        padding: 0 12px;
        border-radius: 500px;
    }
`;

const EmptyContent = () => {
    const navigate = useNavigate();
    return (
        <StyledContainer>
            <Link to="/" className="back">
                <StyledFaXmark />
            </Link>
            <StyledFlex center flexDirection="column">
                <img src={ cart } alt="cart" />
                <span className="description">加入選購商品即可開啟購物車</span>
                <span className="description-ext">選購餐廳或商店中的商品後，您的購物車即會顯示在此</span>
                <Button
                    title="開始選購"
                    onClick={ () => navigate('/') }
                    className="empty-btn"
                />
            </StyledFlex>
        </StyledContainer>
  )
}

export default EmptyContent