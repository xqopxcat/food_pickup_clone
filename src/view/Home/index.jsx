import React, { useEffect, useRef, useState } from 'react';
import { FiChevronDown, FiSearch } from 'react-icons/fi';
import { AiOutlineTag } from 'react-icons/ai';
import { FaBagShopping, FaPersonWalkingLuggage, FaMedal, FaRegStar, FaCheck } from 'react-icons/fa6';
import styled from 'styled-components';
import {
    Dropdown,
    SearchInput,
    ListRestaurant,
    NavigationBar,
    SelectPanel,
    TagButton,
    Slider,
    Checkbox
} from '../../components/';
import { FOOD_TYPE } from '../../constants';
import { FEED } from '../../constants/feed';
import { DELIVERY_FEE_ITEM, FOOD_PROHIBITIONS_ITEMS, PRICE_ITEMS, RANKING_ITEM } from '../../constants/filter';
import { useGetBranchesQuery } from "../../redux/services/branchesCoreApi";
import PickupMap from "./PickupMap";
import useGeolocation from "../../hooks/useGeolocation";


export const DELIVERY_TYPE = [
    {
        icon: <FaBagShopping className="w-6 h-6"/>,
        title: '外送',
        value: 'DELIVERY'
    },
    {
        icon: <FaPersonWalkingLuggage className="w-6 h-6"/>,
        title: '外帶',
        value: 'PICKUP'
    }
];

const DELIVERY_FEE_TYPE = {
    [0]: {
        title: '低於 NT$20 外送費',
        value: 20,
    },
    [1]: {
        title: '低於 NT$30 外送費',
        value: 30,
    },
    [2]: {
        title: '低於 NT$60 外送費',
        value: 60,
    },
    [3]: {
        title: '任何金額',
        value: 999,
    },
};

const RANKING = {
    [0]: {
        title: '超過 3',
        value: 3,
    },
    [1]: {
        title: '超過 3.5',
        value: 3.5,
    },
    [2]: {
        title: '超過 4',
        value: 4,
    },
    [3]: {
        title: '超過 4.5',
        value: 4.5,
    },
    [4]: {
        title: '僅限 5',
        value: 5,
    },
};

const defaultPayload = {
    discountMethod: false,
    deliveryFee: 2,
    ranking: 4,
    near30mins: false,
    highestRanking: false,
    price: [],
    prohibitions: [],
    category: {
        title: '分類',
        value: 0,
    }
};

const StyledHead = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 6px;
    padding-bottom: 8px;
    > .address-content {
        padding: 0px 16px;
        > .address-type {
            color: ${({ theme }) => theme.colors['bg-dark-gray']};
            font-size: 12px;
            line-height: 16px;
        }
        > .address {
            display: flex;
            align-items: center;
            span {
                font-size: 14px;
                font-weight: 500;
            }
        }
    }
`;

const StyledDropdown = styled(Dropdown)`
    margin: 0px 16px;
`;

const StyledDeliveryContainer = styled.div`
    font-size: 14px;
    line-height: 20px;
    color: black;
    > .mode {
        display: flex;
        align-items: center;
        height: 72px;
        > .mode-title {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 64px;
            height: 64px;
        }
        > .delivery {
            display: flex;
            flex-grow: 1;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            border-bottom-width: 2px;
            border-color: ${({ theme }) => theme.colors['bg-white']};
            > .delivery-title {
                line-height: 20px;
                font-size: 16px;
                font-weight: 500;
            }
        }
    }
`;

const StyledSearchBar = styled.div`
    padding: ${({ isIntersection }) => isIntersection ? '4px 16px' : '4px 0'};
    position: ${({ isIntersection }) => isIntersection && 'fixed'};
    width: ${({ isIntersection }) => isIntersection && '100%'};
    top: ${({ isIntersection }) => isIntersection && '0'};
    background-color: ${({ isIntersection }) => isIntersection && 'white'};
    margin: ${({ isIntersection }) => !isIntersection && '0px 16px'};
    > button {
        width: 100%;
        border-radius: 500px;
        background-color: ${({ theme }) => theme.colors['bg-white']};
        height: 48px;
        > .container {
            display: flex;
            align-items: center;
            > .icon {
                margin: 0px 16px;
            }
        }
    }
`;

const StyledContainer = styled.div`
    padding: 8px 8px 0 4px;
`;

const StyledSelectPanel = styled(SelectPanel)`
    background-color: ${({ type }) => type ? 'black' : ''};
    color: ${({ type }) => type && 'white'};
`;

const StyledPrice = styled.div`
    display: flex;
    width: 100%;
    padding: 16px
`;

const StyledTagButton = styled(TagButton)`
    flex-grow: 1;
    margin-right: 3px;
    padding: 10px 3px;
    justify-content: center;
    height: 36px;
    &:last-child {
        margin-right: 0px;
    }
`;

const StyledFeedContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
`;

const Home = () => {
    const [delivery, setDelivery] = useState(FEED.diningModes.filter(({ isSelected }) => isSelected)[0].title);
    const [type, setType] = useState(FEED.diningModes.filter(({ isSelected }) => isSelected)[0].title);
    const [delieveryFeeType, setDelieveryFeeType] = useState('外送費');
    const [rankType, setRankType] = useState('評分');
    const [priceType, setPriceType] = useState('價格');
    const [queryPayload, setQueryPayload] = useState(defaultPayload);
    const [isIntersection, setIsIntersection] = useState(false);
    const searchRef = useRef(null);
    const [location, getLocation] = useGeolocation();
    
    useEffect(() => {
        getLocation();
    }, []);
    
    const { data: feedItems } = useGetBranchesQuery();
    
    const option = {
        rootMargin: "4px 0px 4px 0px",
        threshold: 0
    };
    
    const callback = (entries, observe) => {
        console.log(entries[0].isIntersecting);
        setIsIntersection(!entries[0].isIntersecting);
    }
    
    useEffect(() => {
        const observer = new IntersectionObserver(callback, option);
        observer.observe(searchRef.current);
        return () => observer.disconnect();
    }, []);
    
    const handleTypeClick = () => {
        setType(delivery);
    };

    const handleQueryPayload = type => value => {
        switch (type) {
            case 'DISCOUNT_METHOD':
                setQueryPayload(prevPayload => ({
                    ...prevPayload,
                    discountMethod: !prevPayload.discountMethod
                }));
            break;
            case 'FEE':
                setQueryPayload(prevPayload => ({
                    ...prevPayload,
                    deliveryFee: value
                }));
            break;
            case 'NEAR_30_MINS':
                setQueryPayload(prevPayload => ({
                    ...prevPayload,
                    near30mins: !prevPayload.near30mins
                }));
            break;
            case 'HIGHEST_RANKING':
                setQueryPayload(prevPayload => ({
                    ...prevPayload,
                    highestRanking: !prevPayload.highestRanking
                }));
            break;
            case 'RANKING':
                setQueryPayload(prevPayload => ({
                    ...prevPayload,
                    ranking: value
                }));
            break;
            case 'PRICE':
                const { price } = queryPayload;
                const checkPriceItem = price.find(item => item === value);
                if (!checkPriceItem) {
                    const addPriceItem = [...price, value];
                    setQueryPayload(prevPayload => ({
                        ...prevPayload,
                        price: addPriceItem.sort()
                    }));
                }
                else {
                    const newPriceItem = price.filter((item) => item !== value);
                    setQueryPayload(prevPayload => ({
                        ...prevPayload,
                        price: newPriceItem
                    }));
                }
            break;
            default: 
        }
    }
    
    const handleButtonClick = type => {
        const { deliveryFee, ranking, price } = queryPayload;
        switch (type) {
            case 'FEE':
                setDelieveryFeeType(DELIVERY_FEE_TYPE[deliveryFee].title);
                break;
            case 'RANKING':
                setRankType(RANKING[ranking].title);
                break;
            case 'PRICE':
                setPriceType(price.join(','))
                break;
            default: 
        }
    }
    
    const handleReset = () => {
        setQueryPayload(defaultPayload);
        setDelieveryFeeType('外送費');
        setRankType('評分');
        setPriceType('價格');
    }
    
    return (
        <>
            <div>
                <StyledHead>
                    <div className="address-content">
                        <div className="address-type">立即外送</div>
                        <div className="address">
                            <span>中山路x號</span>
                            <FiChevronDown style={{ margin: '0px 16px 0 8px' }} />
                        </div>
                    </div>
                    <StyledDropdown 
                        title="餐點選項"
                        onClick={ handleTypeClick }
                        selectValue={ delivery }
                        selectType={ type }
                    >
                        <StyledDeliveryContainer aria-labelledby="dropdownDefaultButton">
                        {
                            FEED.diningModes.map(({ mode, title }, index) => {
                                return (
                                    <div key={ title } className="mode" onClick={ () => setDelivery(title) }>
                                        <div className="mode-title">
                                            { mode === "DELIVERY" ? <FaBagShopping style={{ width: 24, height: 24 }}/> : <FaPersonWalkingLuggage style={{ width: 24, height: 24 }} /> }
                                        </div>
                                        <div className="delivery" style={{ border: index === DELIVERY_TYPE.length - 1 ? 'none' : '' }}>
                                            <div className="delivery-title">{ title }</div>
                                            { delivery === title && <FaCheck style={{ width: 24, height: 24, fontColor: '#0d8345', marginRight: 16 }} /> }
                                        </div>
                                    </div>
                                )
                            })
                        }   
                        </StyledDeliveryContainer>
                    </StyledDropdown>
                </StyledHead>
                <div ref={ searchRef } className="search"></div>
                {
                    isIntersection && (
                        <div style={{ height: 56 }}></div>
                    )
                }
                {
                    type === '外送' && (
                        <StyledSearchBar isIntersection={ isIntersection }>
                            <button>
                                <div className="container">
                                    <FiSearch className="icon"/>
                                    <span>搜尋 Uber Eats</span>
                                </div>
                            </button>
                        </StyledSearchBar>
                    )
                }
                <PickupMap items={ feedItems } show={ type !== '外送' }/>
                <NavigationBar items={ FOOD_TYPE } />
                <>
                    <div>{`latitude: ${ location ? location.lat : 'N/A' }`}</div>
                    <div>{`longitude: ${ location ? location.lng : 'N/A' }`}</div>
                </>
                {
                    type === '外送' && (
                        <StyledContainer>
                            <NavigationBar>
                                <TagButton
                                    active={ queryPayload.discountMethod }
                                    value="優惠方案" icon={<AiOutlineTag />}
                                    onClick={ handleQueryPayload('DISCOUNT_METHOD') }
                                    style={{ margin: '0px 8px 0px 4px' }}
                                />
                                <StyledSelectPanel
                                    title="外送費"
                                    selectType={delieveryFeeType}
                                    onClick={ () => handleButtonClick('FEE') }
                                    onReset={ handleReset }
                                    style={{ margin: '0px 8px 0px 4px' }}
                                    type={ delieveryFeeType !== '外送費' }
                                >
                                    <div style={{ padding: '16px 16px 24px' }}>
                                        { DELIVERY_FEE_TYPE[queryPayload.deliveryFee].title }
                                    </div>
                                    <div style={{ padding: '16px' }}>
                                        <Slider 
                                            items={ DELIVERY_FEE_ITEM } 
                                            value={queryPayload.deliveryFee}
                                            onChange={ handleQueryPayload('FEE') }
                                        />
                                    </div>
                                </StyledSelectPanel>
                                <TagButton
                                    active={ queryPayload.near30mins }
                                    value="不到三十分鐘"
                                    onClick={ handleQueryPayload('NEAR_30_MINS') }
                                    style={{ marginLeft: 4, marginRight: 8 }}
                                />
                                <TagButton
                                    active={ queryPayload.highestRanking }
                                    value="評分最高"
                                    icon={<FaMedal />}
                                    onClick={ handleQueryPayload('HIGHEST_RANKING') }
                                    style={{ marginLeft: 4, marginRight: 8 }}
                                />
                                <StyledSelectPanel
                                    icon={<FaRegStar />}
                                    title="評分"
                                    selectType={rankType}
                                    onClick={ () => handleButtonClick('RANKING') }
                                    onReset={ handleReset }
                                    type={ rankType !== '評分' }
                                >
                                    <div style={{ padding: '16px 16px 24px' }}>
                                        { RANKING[queryPayload.ranking].title }
                                    </div>
                                    <div style={{ padding: '16px' }}>
                                        <Slider
                                            direction="left"
                                            items={ RANKING_ITEM } 
                                            value={queryPayload.ranking}
                                            onChange={ handleQueryPayload('RANKING') }
                                        />
                                    </div>
                                </StyledSelectPanel>
                                <StyledSelectPanel
                                    title="價格"
                                    selectType={priceType}
                                    onClick={ () => handleButtonClick('PRICE') }
                                    onReset={ handleReset }
                                    type={ priceType !== '價格' }
                                >
                                    <StyledPrice>
                                        {
                                            PRICE_ITEMS.map((item) => {
                                                return (
                                                    <StyledTagButton
                                                        key={ item }
                                                        active={ queryPayload.price.includes(item) }
                                                        value={ item }
                                                        onClick={ () => handleQueryPayload('PRICE')(item) }
                                                    />
                                                );
                                            })
                                        }
                                    </StyledPrice>
                                </StyledSelectPanel>
                                {/* <SelectPanel
                                    title="飲食限制"
                                    selectType={priceType}
                                    onClick={ () => handleButtonClick('PRICE') }
                                    onReset={ handleReset }
                                    // extendClass={ priceType !== '價格' ? 'bg-black text-white' : ''}
                                >
                                    <div className="w-full px-5">
                                        {
                                            FOOD_PROHIBITIONS_ITEMS.map(({ title, value }, index) => {
                                                return (
                                                    <div className={`flex items-center flex-grow justify-between h-16 border-b-2 border-[#f3f3f3] ${index === FOOD_PROHIBITIONS_ITEMS.length - 1 ? 'border-none' : ''}`}>
                                                        <Checkbox name={ title } value={ value } />
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </SelectPanel> */}
                            </NavigationBar>
                        </StyledContainer>
                    )
                }
                
            </div>
            <StyledFeedContainer>
                {
                    feedItems?.branches?.map((item, index) => {
                        return (
                            <ListRestaurant
                                store={ item }
                            />
                        )
                    })
                }
            </StyledFeedContainer>
        </>
    )
}

export default Home;

// import React, { useEffect, useRef, useState } from 'react';
// import { FiChevronDown, FiSearch } from 'react-icons/fi';
// import { AiOutlineTag } from 'react-icons/ai';
// import { FaBagShopping, FaPersonWalkingLuggage, FaMedal, FaRegStar, FaCheck } from 'react-icons/fa6';
// import styled from 'styled-components';
// import {
//     Dropdown,
//     SearchInput,
//     ListRestaurant,
//     NavigationBar,
//     SelectPanel,
//     TagButton,
//     Slider,
//     Checkbox
// } from '../../components/';
// import { FOOD_TYPE } from '../../constants';
// import { FEED } from '../../constants/feed';
// import { DELIVERY_FEE_ITEM, FOOD_PROHIBITIONS_ITEMS, PRICE_ITEMS, RANKING_ITEM } from '../../constants/filter';
// import { useGetBranchesQuery } from "../../redux/services/branchesCoreApi";


// export const DELIVERY_TYPE = [
//     {
//         icon: <FaBagShopping className="w-6 h-6"/>,
//         title: '外送',
//         value: 'DELIVERY'
//     },
//     {
//         icon: <FaPersonWalkingLuggage className="w-6 h-6"/>,
//         title: '外帶',
//         value: 'PICKUP'
//     }
// ];

// const DELIVERY_FEE_TYPE = {
//     [0]: {
//         title: '低於 NT$20 外送費',
//         value: 20,
//     },
//     [1]: {
//         title: '低於 NT$30 外送費',
//         value: 30,
//     },
//     [2]: {
//         title: '低於 NT$60 外送費',
//         value: 60,
//     },
//     [3]: {
//         title: '任何金額',
//         value: 999,
//     },
// };

// const RANKING = {
//     [0]: {
//         title: '超過 3',
//         value: 3,
//     },
//     [1]: {
//         title: '超過 3.5',
//         value: 3.5,
//     },
//     [2]: {
//         title: '超過 4',
//         value: 4,
//     },
//     [3]: {
//         title: '超過 4.5',
//         value: 4.5,
//     },
//     [4]: {
//         title: '僅限 5',
//         value: 5,
//     },
// };

// const defaultPayload = {
//     discountMethod: false,
//     deliveryFee: 2,
//     ranking: 4,
//     near30mins: false,
//     highestRanking: false,
//     price: [],
//     prohibitions: [],
//     category: {
//         title: '分類',
//         value: 0,
//     }
// };

// const StyledHead = styled.div`
//     display: flex;
//     justify-content: space-between;
//     padding-top: 6px;
//     padding-bottom: 8px;
//     > .address-content {
//         padding: 0px 16px;
//         > .address-type {
//             color: ${({ theme }) => theme.colors['bg-dark-gray']};
//             font-size: 12px;
//             line-height: 16px;
//         }
//         > .address {
//             display: flex;
//             align-items: center;
//             span {
//                 font-size: 14px;
//                 font-weight: 500;
//             }
//         }
//     }
// `;

// const StyledDropdown = styled(Dropdown)`
//     margin: 0px 16px;
//     > .delivery-container {
//         font-size: 14px;
//         line-height: 20px;
//         color: black;
//         > .mode {
//             display: flex;
//             align-items: center;
//             height: 72px;
//             > .mode-title {
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 weight: 64px;
//                 height: 64px;
//             }
//         }
//         > .delivery {
//             display: flex;
//             flex-grow: 1;
//             justify-content: space-between;
//             align-items: center;
//             height: 100%;
//             border-bottom-width: 2px;
//             border-color: ${({ theme }) => theme.colors['bg-white']};
//             > .delivery-title {
//                 line-height: 20px;
//                 font-size: 16px;
//                 font-weight: 500;
//             }
//         }
//     }
// `;

// const StyledSearchBar = styled.div`
//     padding: ${({ isIntersection }) => isIntersection ? '4px 16px' : '4px 0'};
//     position: ${({ isIntersection }) => isIntersection && 'fixed'};
//     width: ${({ isIntersection }) => isIntersection && '100%'};
//     top: ${({ isIntersection }) => isIntersection && '0'};
//     background-color: ${({ isIntersection }) => isIntersection && 'white'};
//     margin: ${({ isIntersection }) => !isIntersection && '0px 16px'};
//     > button {
//         width: 100%;
//         border-radius: 500px;
//         background-color: ${({ theme }) => theme.colors['bg-white']};
//         height: 48px;
//         > .container {
//             display: flex;
//             align-items: center;
//             > .icon {
//                 margin: 0px 16px;
//             }
//         }
//     }
// `;

// const StyledContainer = styled.div`
//     padding: 8px 8px 0 4px;
// `;

// const StyledSelectPanel = styled(SelectPanel)`
//     background-color: ${({ type }) => type ? 'black' : ''};
//     color: ${({ type }) => type && 'white'};
// `;

// const StyledPrice = styled.div`
//     display: flex;
//     width: 100%;
//     padding: 16px
// `;

// const StyledTagButton = styled(TagButton)`
//     flex-grow: 1;
//     margin-right: 3px;
//     padding: 10px 3px;
//     justify-content: center;
//     height: 36px;
//     &:last-child {
//         margin-right: 0px;
//     }
// `;

// const StyledFeedContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     padding: 16px;
// `;

// const Home = () => {
//     const [delivery, setDelivery] = useState(FEED.diningModes.filter(({ isSelected }) => isSelected)[0].title);
//     const [type, setType] = useState(FEED.diningModes.filter(({ isSelected }) => isSelected)[0].title);
//     const [delieveryFeeType, setDelieveryFeeType] = useState('外送費');
//     const [rankType, setRankType] = useState('評分');
//     const [priceType, setPriceType] = useState('價格');
//     const [queryPayload, setQueryPayload] = useState(defaultPayload);
//     const [isIntersection, setIsIntersection] = useState(false);
//     const searchRef = useRef(null);
    
//     const { data } = useGetBranchesQuery();
    
//     console.log(data);
    
//     const feedItems = FEED.feedItems.filter(({ type }) => type === 'REGULAR_STORE');
//     const option = {
//         rootMargin: "4px 0px 4px 0px",
//         threshold: 0
//     };
    
//     const callback = (entries, observe) => {
//         console.log(entries[0].isIntersecting);
//         setIsIntersection(!entries[0].isIntersecting);
//     }
    
//     useEffect(() => {
//         const observer = new IntersectionObserver(callback, option);
//         observer.observe(searchRef.current);
//         return () => observer.disconnect();
//     }, []);
    
//     const handleTypeClick = () => {
//         setType(delivery);
//     };

//     const handleQueryPayload = type => value => {
//         switch (type) {
//             case 'DISCOUNT_METHOD':
//                 setQueryPayload(prevPayload => ({
//                     ...prevPayload,
//                     discountMethod: !prevPayload.discountMethod
//                 }));
//             break;
//             case 'FEE':
//                 setQueryPayload(prevPayload => ({
//                     ...prevPayload,
//                     deliveryFee: value
//                 }));
//             break;
//             case 'NEAR_30_MINS':
//                 setQueryPayload(prevPayload => ({
//                     ...prevPayload,
//                     near30mins: !prevPayload.near30mins
//                 }));
//             break;
//             case 'HIGHEST_RANKING':
//                 setQueryPayload(prevPayload => ({
//                     ...prevPayload,
//                     highestRanking: !prevPayload.highestRanking
//                 }));
//             break;
//             case 'RANKING':
//                 setQueryPayload(prevPayload => ({
//                     ...prevPayload,
//                     ranking: value
//                 }));
//             break;
//             case 'PRICE':
//                 const { price } = queryPayload;
//                 const checkPriceItem = price.find(item => item === value);
//                 if (!checkPriceItem) {
//                     const addPriceItem = [...price, value];
//                     setQueryPayload(prevPayload => ({
//                         ...prevPayload,
//                         price: addPriceItem.sort()
//                     }));
//                 }
//                 else {
//                     const newPriceItem = price.filter((item) => item !== value);
//                     setQueryPayload(prevPayload => ({
//                         ...prevPayload,
//                         price: newPriceItem
//                     }));
//                 }
//             break;
//             default: 
//         }
//     }
    
//     const handleButtonClick = type => {
//         const { deliveryFee, ranking, price } = queryPayload;
//         switch (type) {
//             case 'FEE':
//                 setDelieveryFeeType(DELIVERY_FEE_TYPE[deliveryFee].title);
//                 break;
//             case 'RANKING':
//                 setRankType(RANKING[ranking].title);
//                 break;
//             case 'PRICE':
//                 setPriceType(price.join(','))
//                 break;
//             default: 
//         }
//     }
    
//     const handleReset = () => {
//         setQueryPayload(defaultPayload);
//         setDelieveryFeeType('外送費');
//         setRankType('評分');
//         setPriceType('價格');
//     }
    
//     return (
//         <>
//             <div>
//                 <StyledHead>
//                     <div className="address-content">
//                         <div className="address-type">立即外送</div>
//                         <div className="address">
//                             <span>中山路x號</span>
//                             <FiChevronDown style={{ margin: '0px 16px 0 8px' }} />
//                         </div>
//                     </div>
//                     <StyledDropdown 
//                         title="餐點選項"
//                         onClick={ handleTypeClick }
//                         selectValue={ delivery }
//                         selectType={ type }
//                     >
//                         <div className="delivery-container" aria-labelledby="dropdownDefaultButton">
//                         {
//                             FEED.diningModes.map(({ mode, title }, index) => {
//                                 return (
//                                     <div key={ title } className="mode" onClick={ () => setDelivery(title) }>
//                                         <div className="mode-title">
//                                             { mode === "DELIVERY" ? <FaBagShopping style={{ weight: 24, height: 24 }}/> : <FaPersonWalkingLuggage style={{ weight: 24, height: 24 }} /> }
//                                         </div>
//                                         <div className="delivery" style={{ border: index === DELIVERY_TYPE.length - 1 ? 'none' : '' }}>
//                                             <div className="delivery-title">{ title }</div>
//                                             { delivery === title && <FaCheck style={{ weight: 24, height: 24, fontColor: '#0d8345', marginRight: 16 }} /> }
//                                         </div>
//                                     </div>
//                                 )
//                             })
//                         }   
//                         </div>
//                     </StyledDropdown>
//                 </StyledHead>
//                 <div ref={ searchRef } className="search"></div>
//                 {
//                     isIntersection && (
//                         <div style={{ height: 56 }}></div>
//                     )
//                 }
//                 <StyledSearchBar isIntersection={ isIntersection }>
//                     <button>
//                         <div className="container">
//                             <FiSearch className="icon"/>
//                             <span>搜尋 Uber Eats</span>
//                         </div>
//                     </button>
//                 </StyledSearchBar>
//                 <NavigationBar items={ FOOD_TYPE } />
//                 <StyledContainer>
//                     <NavigationBar>
//                         <TagButton
//                             active={ queryPayload.discountMethod }
//                             value="優惠方案" icon={<AiOutlineTag />}
//                             onClick={ handleQueryPayload('DISCOUNT_METHOD') }
//                             style={{ margin: '0px 8px 0px 4px' }}
//                         />
//                         <StyledSelectPanel
//                             title="外送費"
//                             selectType={delieveryFeeType}
//                             onClick={ () => handleButtonClick('FEE') }
//                             onReset={ handleReset }
//                             style={{ margin: '0px 8px 0px 4px' }}
//                             type={ delieveryFeeType !== '外送費' }
//                         >
//                             <div style={{ padding: '16px 16px 24px' }}>
//                                 { DELIVERY_FEE_TYPE[queryPayload.deliveryFee].title }
//                             </div>
//                             <div style={{ padding: '16px' }}>
//                                 <Slider 
//                                     items={ DELIVERY_FEE_ITEM } 
//                                     value={queryPayload.deliveryFee}
//                                     onChange={ handleQueryPayload('FEE') }
//                                 />
//                             </div>
//                         </StyledSelectPanel>
//                         <TagButton
//                             active={ queryPayload.near30mins }
//                             value="不到三十分鐘"
//                             onClick={ handleQueryPayload('NEAR_30_MINS') }
//                             style={{ marginLeft: 4, marginRight: 8 }}
//                         />
//                         <TagButton
//                             active={ queryPayload.highestRanking }
//                             value="評分最高"
//                             icon={<FaMedal />}
//                             onClick={ handleQueryPayload('HIGHEST_RANKING') }
//                             style={{ marginLeft: 4, marginRight: 8 }}
//                         />
//                         <StyledSelectPanel
//                             icon={<FaRegStar />}
//                             title="評分"
//                             selectType={rankType}
//                             onClick={ () => handleButtonClick('RANKING') }
//                             onReset={ handleReset }
//                             type={ rankType !== '評分' }
//                         >
//                             <div style={{ padding: '16px 16px 24px' }}>
//                                 { RANKING[queryPayload.ranking].title }
//                             </div>
//                             <div style={{ padding: '16px' }}>
//                                 <Slider
//                                     direction="left"
//                                     items={ RANKING_ITEM } 
//                                     value={queryPayload.ranking}
//                                     onChange={ handleQueryPayload('RANKING') }
//                                 />
//                             </div>
//                         </StyledSelectPanel>
//                         <StyledSelectPanel
//                             title="價格"
//                             selectType={priceType}
//                             onClick={ () => handleButtonClick('PRICE') }
//                             onReset={ handleReset }
//                             type={ priceType !== '價格' }
//                         >
//                             <StyledPrice>
//                                 {
//                                     PRICE_ITEMS.map((item) => {
//                                         return (
//                                             <StyledTagButton 
//                                                 active={ queryPayload.price.includes(item) }
//                                                 value={ item }
//                                                 onClick={ () => handleQueryPayload('PRICE')(item) }
//                                             />
//                                         );
//                                     })
//                                 }
//                             </StyledPrice>
//                         </StyledSelectPanel>
//                         {/* <SelectPanel
//                             title="飲食限制"
//                             selectType={priceType}
//                             onClick={ () => handleButtonClick('PRICE') }
//                             onReset={ handleReset }
//                             // extendClass={ priceType !== '價格' ? 'bg-black text-white' : ''}
//                         >
//                             <div className="w-full px-5">
//                                 {
//                                     FOOD_PROHIBITIONS_ITEMS.map(({ title, value }, index) => {
//                                         return (
//                                             <div className={`flex items-center flex-grow justify-between h-16 border-b-2 border-[#f3f3f3] ${index === FOOD_PROHIBITIONS_ITEMS.length - 1 ? 'border-none' : ''}`}>
//                                                 <Checkbox name={ title } value={ value } />
//                                             </div>
//                                         );
//                                     })
//                                 }
//                             </div>
//                         </SelectPanel> */}
//                     </NavigationBar>
//                 </StyledContainer>
//             </div>
//             <StyledFeedContainer>
//                 {
//                     feedItems.map(({ store }, index) => {
//                         return (
//                             <ListRestaurant
//                                 store={ store }
//                             />
//                         )
//                     })
//                 }
//             </StyledFeedContainer>
//         </>
//     )
// }

// export default Home;