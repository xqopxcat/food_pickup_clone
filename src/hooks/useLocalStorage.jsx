import react, { useState, useEffect } from 'react';

const useLocalStorage = (key) => {
    const [state, setState] = useState(localStorage.getItem(key));
    const setStorage = (item) => {
        localStorage.setItem(key, item);
        setState(item);
    }
    
    return [
        state, setStorage
    ]
}

export default useLocalStorage;