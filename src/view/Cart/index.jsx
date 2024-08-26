import React from 'react'
import { FaPlus } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import EmptyContent, { StyledFaXmark } from './EmptyContent'; 
import { Button, CartQuantity, Flex, Footer, TagButton } from '../../components';
import useLocalStorage from "../../hooks/useLocalStorage";
import styled from 'styled-components';

const StyledContainer = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
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
    > .sum {
        margin: 16px 0;
        font-size: 18px;
        font-weight: 500;
        line-height: 24px;
    }
`;

const StyledFlex = styled(Flex)`
    width: 100%;
    margin-top: 56px;
    > .to-item {
        font-size: 24px;
        font-weight: 700;
        line-height: 32px;
    }
    > .items-flex {
        white-space: nowrap;
    }
    > .image {
        height: 100%;
        min-width: 72px;
        max-width: 72px;
        min-height: 72px;
        max-height: 72px;
        object-fit: cover;
        border-radius: 8px;
    }
`

const StyledItemsContainer = styled(Flex)`
    margin: 20px 0;
    > .image {
        height: 100%;
        min-width: 72px;
        max-width: 72px;
        min-height: 72px;
        max-height: 72px;
        object-fit: cover;
        border-radius: 8px;
    }
    > .item {
        padding-top: 4px;
        margin-left: 16px;
        line-height: 20px;
        font-size: 14px;
        font-weight: 400;
        > .title {
            font-size: 16px;
        }
        > .content {
            padding-top: 2px;
            color: ${({ theme }) => theme.colors['bg-gray']};
            margin-bottom: 8px;
        }
        > .total-price {
            padding-top: 2px;
            color: ${({ theme }) => theme.colors['bg-gray']};
        }
    }
`;

const HorizontalLine = styled.hr`
    height: 4px;
    margin: 16px -16px;
    background-color: ${({ theme }) => theme.colors['bg-white'] };
`

const Cart = () => {
    const navigate = useNavigate();
    const [orderStorage, setOrderStorage] = useLocalStorage('order');
    const [storeStorage, setStoreStorage] = useLocalStorage('store');
    const [storeIDstorage, setStoreIDstorage] = useLocalStorage('storeID');
    const [quantitiesStorage, setQuantitiesStorage] = useLocalStorage('quantities');
    const [priceStorage, setPriceStorage] = useLocalStorage('price');
    const order = JSON.parse(orderStorage);
    
    if (order?.length === 0 || !order) return (
        <EmptyContent />
    )
    
    const handleOrder = (id, value, additionalSum = 0) => {
        const selectOrder = order.filter(({ uuid }) => uuid === id);
        if (value === 'inc') {
            selectOrder[0].quantity += 1
            const item = order.map((el) => {
                if (el.uuid === id) {
                    return selectOrder[0];
                }
                return el;
            });
            setOrderStorage(JSON.stringify(item))
            const updatedPrice = parseInt(priceStorage) + parseInt(selectOrder[0].price) + additionalSum;
            setPriceStorage(updatedPrice);
        }
        else if (value === 'dec') {
            if (selectOrder[0].quantity > 1) {
                selectOrder[0].quantity -= 1
                const item = order.map((el) => {
                    if (el.uuid === id) {
                        return selectOrder[0];
                    }
                    return el;
                });
                setOrderStorage(JSON.stringify(item));
                const updatedPrice = parseInt(priceStorage) - parseInt(selectOrder[0].price) - additionalSum;
                setPriceStorage(updatedPrice);
            }
            else {
                const item = order.filter(({ uuid }) => uuid !== id);
                setOrderStorage(JSON.stringify(item));
                const updatedPrice = item.map(({ price, quantity }) => price * quantity)[0] || 0;
                setPriceStorage(updatedPrice);
                setQuantitiesStorage(item.length);
            }
        }
    }
    
    return (
        <>
            <StyledContainer>
                <Link to="/" className="back">
                    <StyledFaXmark />
                </Link>
                <StyledFlex flexDirection="column" gap="16px">
                    <Link className="to-item" to={`/store/${storeStorage}/${storeIDstorage}`} >
                        { storeStorage }
                    </Link>
                    {
                         order.map(({uuid, title, imageUrl, price, quantity, additionalItem }) => {
                            const additionalPrice = additionalItem ? additionalItem.map(({ price }) => price) : [];
                            const additionalSum = additionalPrice.reduce((partialSum, a) => partialSum + a, 0);
                            return (
                                <Flex spaceBetween gap="16px" key={ uuid } onClick={ () => {} } className="items-flex">
                                    <StyledItemsContainer center>
                                        <img
                                            alt={ title }
                                            src={ imageUrl }
                                            aria-hidden="true"
                                            loading="lazy"
                                            decoding="async"
                                            className="image"
                                        />
                                        <div className="item">
                                            <div className="title">
                                                <span>{ title }</span>
                                            </div>
                                            <p className="content">
                                                {
                                                    additionalItem && additionalItem?.map(({ title, price                                                }) => {
                                                        return (
                                                            <span style={{ whiteSpace: 'pre-wrap' }}>{`${title} ($${price / 100}) `}</span>
                                                        )
                                                    })
                                                }
                                            </p>
                                            <Flex className="total-price">
                                                <span>{`$${(additionalSum + price) / 100}`}</span>
                                            </Flex>
                                        </div>
                                    </StyledItemsContainer>
                                    <CartQuantity value={ quantity } onChange={ (value) => handleOrder(uuid, value, additionalSum) } />
                                </Flex>
                            )
                         })
                    }
                </StyledFlex>
                <Flex flexEnd style={{ width: '100%' }}>
                    <TagButton
                        icon={<FaPlus />}
                        value="新增商品"
                        onClick={ () => navigate(`/store/${storeStorage}/${storeIDstorage}`) }
                    />
                </Flex>
                <HorizontalLine />
                <Flex spaceBetween className="sum">
                    <span>小計</span>
                    <span>{`$${ priceStorage / 100 }`}</span>
                </Flex>
            </StyledContainer>
            <Footer>
                <Button onClick={ () => {} } style={{ width: '100%' }} title="結帳"/>
            </Footer>
        </>
    )
}

export default Cart;