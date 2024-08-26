import React from 'react';

const Button = ({ title, onClick, className, outline, textSize = 'large', ...props }) => {
    return (
        <button 
            onClick={ onClick } 
            className={`btn 
                ${outline ? 'btn-outline' : ''}
                ${textSize === 'medium' ? 'btn-small' : 'btn-large'}
                ${ className }`}
            {...props}
        >
            { title }
        </button>
    );
};

export default Button;