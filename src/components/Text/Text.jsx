import React from 'react';
import './Text.css';

 const Text = (props) => {
    let text = props.value;

    if (typeof props.value === 'object') {text = props.value.map((item, index) => {
        return (
            <div key = {index}>
                {item} <br />
            </div>
        );
    });
    }
    return (
        <div className= {props.className} style= {props.style} >
            {text}
        </div>
    );
  };

export default Text;