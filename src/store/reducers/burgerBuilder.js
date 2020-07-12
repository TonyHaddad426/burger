import * as actionTypes from "../actions/actionsTypes";

// you want to define what the state looks like initially
const initialState = {
  ingredients: null,
  totalPrice: 4, // use Redux to manage
  loading: false,
  error: false,
  building: false
};

// name global constants in all capital letters
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

// create the reducer function used to manipulate the old state
const reducer = (state = initialState, action) => {
  switch (
    action.type // must always have type on the action property
  ) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state, // to alter the state immutably - you must copy the old state first using the spread operator
        // ...state only copies the highest level value pairs - you must also use the spread operator to copy all nested layers
        ingredients: {
          ...state.ingredients,
          // the below syntax [action.ingredientName] dynamically targets the specific ingredient to be changed
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1 // ingredientName is an expected payload from the action
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
      };

    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
      };

      case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };

    default:
      return state; // return the old state if none of the cases above apply
  }
};

export default reducer;
