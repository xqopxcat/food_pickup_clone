import React, { useEffect, useState } from 'react'
import { FiMinus, FiPlus, FiTrash } from "react-icons/fi";
import styled from 'styled-components';

const StyledSelector = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    border-radius: 9999px;
    background-color: ${({ theme }) => theme.colors['bg-white']};
    > .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 36px;
        height: 36px;
        > .image {
            width: 16px;
            height: 16px;
        }
    }
    > .qty {
        margin: 0 12px;
        font-size: 14px;
        line-height: 20px;
    }
`;

const QuantitySelector = ({ value, max, delIcon, onChange }) => {
    const [qty, setQty] = useState(value);
    
    const incQty = () => {
        if (qty >= max) return;
        setQty((prevQty) => prevQty + 1);
        onChange('inc');
    }
    
    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            
            return prevQty - 1;
        });
        onChange('dec');
    }
    
    return (
        <StyledSelector>
            <span className="icon" onClick={ decQty }>
                {delIcon && qty === 1 ? <FiTrash className="image" /> : <FiMinus className="image" />}
            </span>
            <span className="qty">
                { qty }
            </span>
            <span className="icon" onClick={ incQty }>
                <FiPlus className="image" />
            </span>
        </StyledSelector>
    )
}

export default QuantitySelector;