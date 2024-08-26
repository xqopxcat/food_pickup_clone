import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaRegThumbsUp, FaXmark } from 'react-icons/fa6';
import { menuItems } from '../../constants/menuItem';
import { useStateContext } from '../../context/StateContext';
import { Checkbox,
    ItemTag,
    NavigationBar,
    RadioCard,
    QuantityCounter,
    QuantitySelector,
    Button,
    Flex,
    Footer
} from '../../components';
import useLocalStorage from '../../hooks/useLocalStorage';
import styled from 'styled-components';

const StyledTitleContainer = styled.div`
    top: 0px;
    width: 100%;
    position: absolute;
    > .link-back {
        position: absolute;
        top: 8px;
        left: 8px;
        padding: 16px;
        border-radius: 9999px;
        background-color: ${({ theme }) => theme.colors['bg-white']};
    }
    > .banner-image {
        width: 100%;
        height: 15vh;
        min-height: 233px;
        object-fit: cover;
    }
`;

const StyledDescription = styled.div`
    padding: 16px 16px 0;
    > .title {
        font-weight: 700;
        font-size: 24px;
        line-height: 32px
    }
    > .price {
        line-height: 24px;
        font-size: 20px;
        color: ${({ theme }) => theme.colors['bg-dark-gray']};
        white-space: pre-wrap;
    }
    > .description {
        margin: 8px 0 10px;
        > div {
            line-height: 20px;
            font-size: 14px;
            white-space: pre-line;
        }
    }
`;

const StyledContentContainer = styled.div`
    margin-left: 8px;
    > .title {
        margin: 17px 0 12px 8px;
        line-height: 20px;
        font-size: 16px;
        font-weight: 500;
    }
`;

const StyledItemContainer = styled.div`
    margin: 0 16px;
    .title {
        margin-top: 16px;
        line-height: 28px;
        font-size: 20px;
        font-weight: 700;
    }
    .description {
        font-size: 14px;
        line-height: 20px;
        color: ${({ theme }) => theme.colors['bg-dark']};
    }
    .items-grid {
        margin: 16px 0;
        font-size: 14px;
        .items-title {
            font-weight: 500;
            line-height: 16px;
        }
        .items-price {
            font-weight: 400;
            line-height: 20px;
            white-space: nowrap;
        }
        .items-subtitle {
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            color: ${({ theme }) => theme.colors['bg-green']};
        }
    }
`;

const BoldLine = styled.hr`
    height: 8px;
    margin-top: 16px;
    margin-left: -32px;
    background-color: ${({ theme }) => theme.colors['bg-white'] };
`

const HorizontalLine = styled.hr`
    height: 1px;
    margin: 16px 0;
    background-color: ${({ theme }) => theme.colors['bg-white'] };
`

const ItemDetails = () => {
    const { name, id, itemId } = useParams();
    const [selected, setSelected] = useState();
    const navigate = useNavigate();
    const [orderStorage, setOrderStorage] = useLocalStorage('order');
    const [storeStorage, setStoreStorage] = useLocalStorage('store');
    const [storeIDstorage, setStoreIDstorage] = useLocalStorage('storeID');
    const [quantitiesStorage, setQuantitiesStorage] = useLocalStorage('quantities');
    const [priceStorage, setPriceStorage] = useLocalStorage('price');
    const {
        cartItems,
        totalPrice,
        totalQuantities,
        toggleCartItemQuantity,
        onAdditionalAdd,
        onEmpty,
        onRemove,
    } = useStateContext();
    const filterItems = menuItems.filter(({ uuid }) => uuid === itemId);
    const { 
        title,
        imageUrl,
        price,
        itemDescription,
        endorsementTags,
        customizationsList
    } = filterItems[0] || '';
    
    const preselected = filterItems[0]?.productDetailsItems?.filter(({ type }) => type === 'PRESELECTED_CUSTOMIZATIONS');
    const filterCartItems = cartItems.filter(({ uuid }) => uuid === itemId);
    
    const handleOrder = () => {
        const order = JSON.parse(orderStorage);
        let updatedOrder = cartItems;
        if (order) {
            updatedOrder = [...order, cartItems[0]]
        }
        setStoreStorage(name);
        setStoreIDstorage(id);
        setQuantitiesStorage(parseInt(quantitiesStorage || 0) + parseInt(totalQuantities));
        setPriceStorage(parseInt(priceStorage || 0) + parseInt(totalPrice));
        setOrderStorage(JSON.stringify(updatedOrder));
        onEmpty();
        navigate(`/store/${name}/${id}`);
    }
    
    const handleBack = () => {
        onRemove(filterItems[0]);
    }
    
    return (
        <StyledTitleContainer>
            <Link onClick={ handleBack } to={`/store/${name}/${id}`} className="link-back">
                <FaXmark />
            </Link>
            <img 
                src={ imageUrl } 
                alt={ itemId }
                className="banner-image"
            />
            <StyledDescription>
                <h1 className="title">{ title }</h1>
                <div className="price">
                    { `$${price / 100}` }
                </div>
                <div className="description">
                    <div>
                        { itemDescription }
                    </div>
                </div>
                <Flex gap="8px">
                    {
                        endorsementTags?.map(({ text, leadingIcon }) => {
                            return (
                                <ItemTag key={ text } icon={ leadingIcon && <FaRegThumbsUp />} text={ text } />
                            )
                        })
                    }
                </Flex>
            </StyledDescription>
            <StyledContentContainer>
                {
                    preselected.map(({ payload }) => {
                        const { preselectedCustomizationsPayload } = payload;
                        return (
                            <>
                                <h3 className="title">{ preselectedCustomizationsPayload.title.richTextElements[0].text.text.text }</h3>
                                <NavigationBar>
                                    {
                                        preselectedCustomizationsPayload.preselectedCustomizationSelection.map(({ item, title, description }) => {
                                            const { richTextElements } = title;
                                            const { customizationV2s } = item;
                                            const { richTextElements: desriptionElements } = description;
                                            return (
                                                <RadioCard
                                                    id={ customizationV2s[0].uuid }
                                                    name={ richTextElements[0].text.text.text }
                                                    value={ customizationV2s[0].uuid }
                                                    description={ desriptionElements[0].text.text.text }
                                                    checked={ selected === customizationV2s[0].uuid }
                                                    onChange={ setSelected }
                                                />
                                            )
                                        })
                                    }
                                </NavigationBar>
                                <BoldLine />
                            </>
                        )
                    })
                }
            </StyledContentContainer>
            <StyledItemContainer>
                {
                    customizationsList.map(({ title, maxPermitted, options }, index) => {
                        return (
                            <>
                                <div>
                                    <div className="title">{ title }</div>
                                    <span className="description">{`最多可選擇 ${ maxPermitted } 個項目`}</span>
                                </div>
                                <div className="items-grid">
                                    {
                                        options.map(({ title, price, maxPermitted: maxItem, defaultQuantity, subtitleV2 }, index) => {
                                            return (
                                                <>
                                                    <Flex spaceBetween>
                                                        <Flex flexDirection="column">
                                                            <span className="items-title">{ title }</span>
                                                            <span className="items-price">{ `+$${ price / 100 }` }</span>
                                                            { subtitleV2 && <span className="items-subtitle">{ subtitleV2.richTextElements[0].text.text.text }</span>}
                                                        </Flex>
                                                        {
                                                            maxPermitted === 1 ? (
                                                                <Checkbox
                                                                    name={ title }
                                                                    onChange={ (e) => {
                                                                        onAdditionalAdd(itemId, options[index], e.target.checked ? 1 : -1)
                                                                    }}
                                                                />
                                                            ) : (
                                                                <QuantityCounter
                                                                    value={ defaultQuantity }
                                                                    max={ maxItem }
                                                                    onChange={ (qty) => onAdditionalAdd(itemId, options[index], qty) }
                                                                />
                                                            )
                                                        }
                                                    </Flex>
                                                    {
                                                        index !== options.length - 1 && (
                                                            <HorizontalLine />
                                                        )
                                                    }
                                                </>
                                            )
                                        })
                                    }
                                </div>
                                {
                                    index !== customizationsList.length - 1 && (
                                        <hr className="w-screen h-2 mt-4 ml-[-16px] bg-[#f3f3f3]" />
                                    )
                                }
                            </>
                        )
                    })
                }
            </StyledItemContainer>
            <div style={{ margin: '24px 12px 112px'}}>
                <QuantitySelector value={ filterCartItems?.[0]?.quantity } max={ 10 } onChange={ (value) => { toggleCartItemQuantity(itemId, value) } }/>
            </div>
            <Footer>
                <Button onClick={ handleOrder } style={{ width: '100%' }} title={`新增 ${totalQuantities} 項商品至訂單 • $${totalPrice / 100}`}/>
            </Footer>
        </StyledTitleContainer>
    )
}

export default ItemDetails;