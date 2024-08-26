import React from 'react';
import { FaRegThumbsUp, FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 12px 12px 8px;
    > .item-container {
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding-top: 4px;
        > .title {
            font-size: 16px;
            line-height: 20px;
        }
        > .content {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            line-height: 20px;
            font-size: 14px;
            font-weight: 400;
            color: ${({ theme }) => theme.colors['bg-gray']};
            > .info {
                display: flex;
                justify-content: center;
                align-items: center;
                padding-top: 2px;
            }
            > .description {
                white-space: pre-wrap;
            }
        } 
    }
    > .image-container {
        position: relative;
        > img {
            height: 100%;
            min-width: 120px;
            max-width: 120px;
            min-height: 112px;
            max-height: 112px;
            object-fit: cover;
            border-radius: 8px;
        }
        > .icon {
            display: flex;
            position: absolute;
            right: 8px;
            bottom: 8px;
            padding: 12px;
            background-color: white;
            border-radius: 9999px;
            box-shadow: 0 2px 12px rgba(0,0,0,.12);
        }
    }
`;


const VerticalGridItem = ({
    title,
    price,
    rating,
    imageUrl,
    description,
    url,
    onAdd
}) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        onAdd();
        navigate(url);
    }
    return (
        <StyledContainer onClick={ handleClick }>
            <div className="item-container">
                <div className="title">
                    <span>{ title }</span>
                </div>
                <div className="content">
                    <div className="info">
                        <span>{`$${price / 100}`}</span>
                        <span>&nbsp;•&nbsp;</span>
                        <FaRegThumbsUp />
                        <span>&nbsp;{ rating }</span>
                    </div>
                    <div className="line-clamp description">
                        { description }
                    </div>
                </div>
            </div>
            {
                imageUrl && (
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
                )
            }
        </StyledContainer>
    );
};

export default VerticalGridItem;