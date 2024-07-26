import React from 'react';
import './divider.css'

const Divider = ({ label = "" }) => {
    return(
        <div className='HULK-divider'>
            {label && <span>{label}</span>}
            <hr/>
        </div>
    )
}


export default Divider;