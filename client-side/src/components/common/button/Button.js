import React from 'react';
import './Button.css'

const Button = ({ type = "submit", disabled = false, children }) => {
    return (
        <button className='HULK-button' type={type} disabled={disabled}>{children}</button>
    )
}

export default Button;