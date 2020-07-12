import React from 'react';
import classes from'./BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [ 
{label: 'Salad', type: 'salad'}, 
{label: 'Bacon', type: 'bacon'},
{label: 'Cheese', type: 'cheese'},
{label: 'Meat', type: 'meat'},


]
// map each element of this array into a 
// controls.map -> maps each control (element) of the controls array into the BuildControl where you set a key 
const buildControls = (props) => (
    
    <div className={classes.BuildControls}>
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => {

           return <BuildControl 
           key={ctrl.label} 
           label={ctrl.label}
           added = {() => props.ingredientAdded(ctrl.type)}
           removed = {()=> props.ingredientRemoved(ctrl.type)}
           dsiabled = {props.disabled[ctrl.type]}
           />;
        })}
        <button className={classes.OrderButtone} disabled={!props.purchasable} onClick={props.ordered}>
        {props.isAuth? "ORDER NOW" : "Sign Up To Order"}
        </button>
    </div>
)

export default buildControls;