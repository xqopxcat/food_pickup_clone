import React, { useState } from 'react'
import { FiMinus, FiPlus } from "react-icons/fi";
import styled from 'styled-components';

const StyledCounter = styled.p`
    display: flex;
    align-items: center;
    > .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 36px;
        height: 36px;
        border-radius: 9999px;
        background-color: ${({ theme }) => theme.colors['bg-white']};
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

const QuantityCounter = ({ value, max, onChange }) => {
    const [qty, setQty] = useState(value);
    
    const incQty = () => {
        if (qty >= max) return;
        setQty((prevQty) => {
            return prevQty + 1
        });
        onChange(1);
    }
    
    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 0) return 0;
            return prevQty - 1;
        });
        onChange(-1);
    }
    
    return (
        <StyledCounter>
            {
                qty > 0 && (
                    <span className="icon" onClick={ decQty }>
                        <FiMinus className="image" />
                    </span>
                )
            }
            <span className="qty">
                { qty }
            </span>
            <span className="icon" onClick={ incQty }>
                <FiPlus className="image" style={{ color: qty >= max ? '#a6a6a6' : 'black' }} />
            </span>
        </StyledCounter>
    );
};

export default QuantityCounter;