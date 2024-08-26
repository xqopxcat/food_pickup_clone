import React from 'react';
import { b64EncodeUnicode } from '../../helpers';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const StyledLink = styled(Link)`
    margin-bottom: 24px;
    .image {
        height: 148px;
        background: ${ p => p.theme.colors['bg-white']};
        img {
            width: 100%;
            height: 100%;
            border-radius: 12px;
            object-fit: cover;
        }
    }
`;

const StyledDetails = styled.div`
    margin-top: 8px;
    .detail-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 4px;
        > .rating {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 28px;
            height: 28px;
            font-size: 12px;
            border-radius: 50%;
            background-color: ${ p => p.theme.colors['bg-light-gray'] };
        }
    }
    .detail-content {
        display: flex;
        font-size: 14px;
        font-weight: 400;
        > span {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        > .text {
            color: ${ p => p.theme.colors['bg-dark-gray'] };
        }
    }
`;

const ListRestaurant = ({ store }) => {
    const { name, images, actionUrl } = store;
    const imageSet = images.map((item) => {
        
        return (`${item} ${item.split('/')[item.split('/').length - 2]}w`)
    }).join();
    return (
        <StyledLink to={ actionUrl } >
            <div className="image">
                <picture>
                    <source type="image/webp" srcSet={images[0]} />
                    <img alt="" role="presentation" 
                        src="" 
                        srcSet={ imageSet }
                        sizes="100vw"
                        loading="lazy"
                        decoding="async"
                    />
                </picture>
            </div>
            <StyledDetails>
                <div className="detail-title">
                    <h3>{ name }</h3>
                    {
                        store.rating && (
                            <div className="rating">
                                { store.rating.text }
                            </div>
                        )
                    }
                </div>
                {/* <div className="detail-content">
                    <span>
                        <img src="https://dkl8of78aprwd.cloudfront.net/uber_one@3x.png" alt width="14" height="14" />
                    </span>
                    <span>&nbsp;•&nbsp;</span>
                    <span>{ meta[1].text }</span>
                    <span>&nbsp;•&nbsp;</span>
                    <span className="text">{ meta[2].text }</span>
                </div> */}
            </StyledDetails>
        </StyledLink>
    );
};

export default ListRestaurant;