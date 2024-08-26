import React from 'react';
import { useParams } from 'react-router-dom';
import { FaRegStar } from 'react-icons/fa6';
import { BsPersonPlusFill } from "react-icons/bs";
import { details } from '../../constants/details';
import { useStateContext } from '../../context/StateContext';
import { NavigationBar, HorizontalGridItem, VerticalGridItem, TabSwitch, TagButton, Flex } from "../../components";
import { DELIVERY_TYPE } from "../Home";
import styled from "styled-components";

const StyledContainer = styled.div`
    > .image {
        width: 100%;
        height: 15vh;
        min-height: 115px;
        object-fit: cover;
    }
    > .title {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 16px 16px 0 16px;
        font-size: 24px;
        font-weight: 700;
    }
    > .content {
        padding: 0 16px;
        > .info {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            width: 100%;
            text-align: center;
            border: 1px solid ${({ theme }) => theme.colors['bg-white']};
            border-radius: 8px;
            margin-top: 12px;
            padding: 12px 0;
            font-size: 12px;
        }
    }
`;

const StyledFlex = styled(Flex)`
    font-size: 14px;
    color: ${({ theme }) => theme.colors['bg-dark-gray']};
    line-height: 20px;
`;

const StyledInfo = styled.p`
    line-height: 16px;
    font-weight: 500;
`;

const StyledText = styled.p`
    line-height: 20px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors['bg-dark-gray']};
`;

const StyledGrid = styled.div`
    padding-left: 8px;
    > .title {
        margin: 16px 0 12px;
        padding-left: 8px;
        line-height: 28px;
        font-size: 20px;
        font-weight: 500;
    }
`;

const HorizontalLine = styled.div`
    width: 100%;
    border-width: 1px;
    margin-top: 16px;
`

const StoreDetails = () => {
    const { name, id } = useParams();
    const { onAdd } = useStateContext();
    const filterDetails = details.filter(({ slug }) => slug === name)[0] || details[0];
    const { 
        heroImageUrls,
        catalogSectionsMap,
        sections,
        rating,
        title,
        fareBadge,
        eatsPassExclusionBadge,
        distanceBadge,
        etaRange,
    } = filterDetails;
    const imageSet = [...heroImageUrls].map(({ url, width }) => {
        return (`${url} ${width}w`)
    }).join();
    const sectionsMap = catalogSectionsMap[sections[0].uuid]
    const horizontalGrid = sectionsMap.filter(({ type }) => type === 'HORIZONTAL_GRID');
    const verticalGrid = sectionsMap.filter(({ type }) => type === 'VERTICAL_GRID');

    return (
        <StyledContainer>
            <img 
                srcSet={ imageSet } 
                alt={ name }
                className="image"
            />
            <h1 className="title">
                { title }
            </h1>
            <StyledFlex center>
                <span style={{ lineHeight: '16px' }}>{ rating.ratingValue }</span>
                <FaRegStar style={{ width: 12, height: 12, margin: '0 4px' }} />
                <StyledFlex center>
                    <span>{` (${rating.reviewCount}) `}</span>
                    <span>&nbsp;•&nbsp;</span>
                    <span>{ fareBadge.text }</span>
                    <span>&nbsp;•&nbsp;</span>
                    <Flex center
                        dangerouslySetInnerHTML={{__html: eatsPassExclusionBadge.textFormat }}
                    ></Flex>
                    <span>Uber One</span>
                    <span>&nbsp;•&nbsp;</span>
                    <span>{ distanceBadge.text }</span>
                </StyledFlex>
            </StyledFlex>
            <div className="content">
                <Flex spaceBetween style={{ marginTop: 16 }}>
                    <TabSwitch items={ DELIVERY_TYPE } />
                    <TagButton
                        icon={<BsPersonPlusFill />}
                        value="團購訂單"
                    />
                </Flex>
                <div className="info">
                    <div>
                        <StyledInfo>
                            { fareBadge.text }
                        </StyledInfo>
                        <StyledText>
                            價格與費用
                        </StyledText>
                    </div>
                    <div style={{ height: 24, borderWidth: 1 }}></div>
                    <div>
                        <StyledInfo>
                            { etaRange.text }
                        </StyledInfo>
                        <StyledText>
                            外送時間
                        </StyledText>
                    </div>
                </div>
            </div>
            {
                horizontalGrid.map(({ payload }) => {
                    const { standardItemsPayload } = payload;
                    return (
                        <StyledGrid>
                            <h3 className="title">{ standardItemsPayload.title.text }</h3>
                            <NavigationBar>
                                {
                                    standardItemsPayload.catalogItems.map((element) => {
                                        const { uuid, title, price, imageUrl, labelPrimary } = element;
                                        const rating = labelPrimary.accessibilityText.split(', ')[1];
                                        return (
                                            <HorizontalGridItem
                                                title={ title }
                                                price={ price }
                                                rating={ rating }
                                                imageUrl={ imageUrl }
                                                onAdd={ () => onAdd(element, 1) }
                                                url={ uuid }
                                            />
                                        );
                                    })
                                }
                                
                            </NavigationBar>
                            <HorizontalLine />
                        </StyledGrid>
                    )
                })
            }
            {
                verticalGrid.map(({ payload }) => {
                    const { standardItemsPayload } = payload;
                    return (
                        <StyledGrid>
                            <h3 className="title">{ standardItemsPayload.title.text }</h3>
                            {
                                standardItemsPayload.catalogItems.map((element) => {
                                    const { uuid, title, price, imageUrl, labelPrimary, itemDescription } = element;
                                    const rating = labelPrimary.accessibilityText.split(', ')[1];
                                    return (
                                        <>
                                            <VerticalGridItem
                                                title={ title }
                                                price={ price }
                                                rating={ rating }
                                                imageUrl={ imageUrl }
                                                description={ itemDescription }
                                                onAdd={ () => onAdd(element, 1) }
                                                url={ uuid }
                                            />
                                            <HorizontalLine style={{ marginBottom: 12 }} />
                                        </>
                                    );
                                })
                            }
                        </StyledGrid>
                    )
                })
            }
            
        </StyledContainer>
    );
};

export default StoreDetails;