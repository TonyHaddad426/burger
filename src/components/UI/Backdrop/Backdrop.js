import React from 'react';
import classes from './Backdrop.module.css';

// if props.show is true we want to return a DIV that holds the styling for the backrop
const backdrop = (props) => (

props.show ? <div className={classes.Backdrop} onClick = {props.clicked}></div> : null

);

export default backdrop;