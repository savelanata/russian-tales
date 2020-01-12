import React from 'react';
import  './Button.css'

const Button = (props) => {
    return (
        <div className={props.className + ' Button'} disabled={props.disabled} id={props.id} onClick={props.onClick} hidden={props.hidden}  > {props.value}  </div>
          );
};

export default Button;