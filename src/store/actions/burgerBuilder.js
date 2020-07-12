import * as actionTypes from "./actionsTypes";
import axios from "../../axios-orders";

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT, // action type to be dispatched to the reducer
    ingredientName: name // additional data to be dispatched to the reducer
  };
}; // you should name the action creators similar to the action types


export const removeIngredient = name => {
    return {
      type: actionTypes.REMOVE_INGREDIENT, // action type to be dispatched to the reducer
      ingredientName: name // additional data to be dispatched to the reducer
    };
  }; // you should name the action creators similar to the action types
  
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

  export const initIngredients = () => {
      return dispatch => { // this syntax is allowed by redux-thunk
        axios
        .get("https://testdb-79d62.firebaseio.com/Ingredients.json")
        .then(response => {
          dispatch(setIngredients(response.data)); //on an axios response the data property holds the data which is the JSON 
        })
        .catch(error => {
          dispatch(fetchIngredientsFailed());
        });
      }
  }