import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case actionTypes.PURCHASE_INIT: 
      return {
          ...state, 
          purchased: false

      };
      case actionTypes.PURCHASE_BURGER_START: 
      return{
        ...state, 
        loading: true
      }; 

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData, // copy order data that was passed onto the server
        id: action.orderId
      };
      return {
        // upon success store orders in the orders array and set loading to false
        ...state,
        loading: false,
        purchased: true,
        // update orders to be the old orders concatenated into a new item - concat returns a new array (immutable update)
        orders: state.orders.concat(newOrder)
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false

      };
      case actionTypes.FETCH_ORDERS_START: 
      return {
          ...state, 
          loading: true
      };
      case actionTypes.FETCH_ORDERS_SUCCESS: // here I want to store the orders fetched from the backend 
      return {
          ...state, 
          orders: action.orders, 
          loading: false
      };
      case actionTypes.FETCH_ORDERS_FAIL: 
      return {
          ...state, 
          loading: false
      };
    default:
      return state;
  }
};

export default reducer;