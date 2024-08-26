import React from 'react';
import { FaRegThumbsUp, FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled.div`
    height: fit-content;
    white-space: nowrap;
    padding-right: 8px;
    > .image-container {
        position: relative;
        > img {
            height: 100%;
            min-width: 144px;
            min-height: 132px;
            max-width: 144px;
            max-height: 132px;
            object-fit: cover;
            border-radius: 8px;
        }
        > .icon {
            display: flex;
            position: absolute;
            padding: 12px;
            bottom: 8px;
            right: 8px;
            background-color: white;
            border-radius: 9999px;
            box-shadow: 0 2px 12px rgba(0,0,0,.12);
        }
    }
    > .content-container {
        padding-top: 4px;
        > .title {
            font-size: 16px;
            line-height: 20px;
        }
        > .content {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            line-height: 20px;
            font-size: 14px;
            color: ${({ theme }) => theme.colors['bg-gray']};
            font-weight: 400;
            padding-top: 2px;
        }
    }
`;

const HorizontalGridItem = ({ url, title, price, imageUrl, rating, onAdd }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        onAdd();
        navigate(url);
    }
    
    return (
        <StyledContainer onClick={ handleClick }>
            <div className="image-container">
                <img
                    alt={ title }
                    src={ imageUrl }
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                />
                <div className="icon">
                    <FaPlus style={{ position: 'relative', width: 12, height: 12 }} />
                </div>
            </div>
            <div className="content-container">
                <div className="title">
                    <span>{ title }</span>
                </div>
                <div className="content">
                    <span>{`$${price / 100}`}</span>
                    <span>&nbsp;•&nbsp;</span>
                    <FaRegThumbsUp />
                    <span>&nbsp;{ rating }</span>
                </div>
            </div>
        </StyledContainer>
    )
}

export default HorizontalGridItem;