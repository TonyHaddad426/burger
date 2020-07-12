import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

// OVERALL: in order to pass the ingredients object (the state defined in BurgerBuilder component)
// we must transfor it into an array 
const burger = props => {
  // the Object.keys method stores an array of the keys of the ingredient object... 
  // transformedIngredients = [salad, bacon, cheese, meat]
  let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
    console.log(transformedIngredients);
    // .map executes a function on each element of the transformedIngredients array
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
      
      // the Array() creates an array - Example: Array(3) creates an array of 3 null elements
    }) // the map method executs a specified function on each element of a specified array
// reduce is a built array function that allows us to transform an array into something else
// the input to reduce is a function that recieves two arguments: the previous value, the current value, and an initial value


    .reduce((arr, el) => {return arr.concat(el);}, []);
    console.log(transformedIngredients);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  console.log(transformedIngredients);

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
export default burger;
