import React from 'react';
import styled from 'styled-components';

const StyledSlider = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    line-height: 16px;
    font-weight: 500;
    padding-bottom: 8px;
`;

const Slider = ({ items, value, onChange, direction = 'right' }) => {
    const position = (value / (items.length - 1)) * 100;
    
    const handleChange = (e) => {
        e.preventDefault();
        onChange(e.target.value);
    }
    
    return (
        <>
            <StyledSlider>
                {
                    items.map((item) => {
                        return (
                            <div key={ item.title }>{ item.title }</div>
                        )
                    })
                }
            </StyledSlider>
            <input
                type="range"
                min="0"
                max={ items.length - 1 }
                step="1"
                value={ value }
                onChange={ handleChange }
                className={`slider gradient-to-${direction === 'right' ? 'r' : 'l'}-${Math.floor(position)}`}
            />
        </>
    )
}

export default Slider;