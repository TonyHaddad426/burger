import React from 'react';
import classes from './Button.module.css';
// btnType will have to either be .Danger or .Success
const button = (props) => (

    <button
    onClick={props.clicked}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    disabled={props.disabled}
    >
    {props.children}
     </button>
);

export default button;