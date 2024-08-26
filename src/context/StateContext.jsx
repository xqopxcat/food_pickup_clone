import React, { createContext, useContext, useState, useEffect } from 'react';
// import useLocalStorage from "../hooks/useLocalStorage";

const Context = createContext();

const StateContext = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    // const [cartStorage, setCartStorage] = useLocalStorage('cartItems');
    // const [totalPriceStorage, setTotalPriceStorage] = useLocalStorage('totalPrice');
    // const [totalQuantitiesStorage, setTotalQuantitiesStorage] = useLocalStorage('totalQuantities');
    
    let foundProduct;
    let index;
    
    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);
    
    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item.uuid === product.uuid);
        
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        
        if (checkProductInCart) {
            const updatedCartItem = cartItems.map((cartProduct) => {
                if (cartProduct.uuid === product.uuid) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
                else {
                    return cartProduct;
                }
            })
            setCartItems(updatedCartItem);
        }
        else {
            product.quantity = quantity;
            
            setCartItems([ ...cartItems, { ...product } ]);
        }
    }
    
    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item.uuid === product.uuid);
        const newCartItems = cartItems.filter((item) => item.uuid !== product.uuid);
        
        setCartItems(newCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
    } 
    
    const toggleCartItemQuantity = (uuid, value) => {
        foundProduct = cartItems.find((item) => item.uuid === uuid);
        index = cartItems.findIndex((product) => product.uuid === uuid);
        const newCartItems = cartItems.filter((item) => item.uuid !== uuid);
        
        if (value === 'inc') {
            setCartItems([...newCartItems, { 
                ...foundProduct, 
                quantity: foundProduct.quantity + 1 
            }]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
        } 
        else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItems([...newCartItems, { 
                    ...foundProduct, 
                    quantity: foundProduct.quantity - 1 
                }]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
            }
        }
    }
    
    const onAdditionalAdd = (mainProductId, product, quantity) => {
        const mainProductInCart = cartItems.filter(({ uuid }) => uuid === mainProductId);
        const checkProductInCart = mainProductInCart[0].additionalItem?.find((item) => item.uuid === product.uuid);
        if (mainProductInCart[0].additionalItem === undefined) {
            mainProductInCart[0].additionalItem = [];
        }
        const { additionalItem } = mainProductInCart[0];
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        if (checkProductInCart) {
            const updatedCartItem = additionalItem?.map((additionalProduct) => {
                if (additionalProduct.uuid === product.uuid) {
                    const additionalQuantity = parseInt(additionalProduct.quantity) + parseInt(quantity);
                    return {
                        ...additionalProduct,
                        quantity: additionalQuantity
                    }
                }
                else {
                    return additionalProduct;
                }
            });
            const updatedProduct = {
                ...mainProductInCart[0],
                additionalItem: updatedCartItem.filter(({ quantity }) => quantity !== 0)
            };
            const mergedItem = cartItems.map((element) => {
                if (element.uuid === mainProductInCart[0].uuid) {
                    return updatedProduct
                }
                return element;
            }); 
            setCartItems(mergedItem);
        }
        else {
            product.quantity = quantity;
            const addProduct = [...additionalItem, product];
            const mergedItem = cartItems.map((element) => {
                if (element.uuid === mainProductInCart[0].uuid) {
                    return {
                        ...mainProductInCart[0],
                        additionalItem: addProduct
                    }
                }
                return element;
            });
            setCartItems(mergedItem);
        }
        // setCartStorage(JSON.stringify(cartItems));
        // setTotalPriceStorage(JSON.stringify(totalPrice));
        // setTotalQuantitiesStorage(JSON.stringify(totalQuantities));
    }
    
    const onEmpty = () => {
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
    }
    
    return (
        <Context.Provider
            value={ {
                cartItems,
                totalPrice,
                totalQuantities,
                onAdd,
                onAdditionalAdd,
                toggleCartItemQuantity,
                onRemove,
                onEmpty,
                setCartItems,
                setTotalPrice,
                setTotalQuantities,
            } }
        >
            { children }
        </Context.Provider>
    )
}

const useStateContext = () => useContext(Context);

export { 
    StateContext,
    useStateContext
}