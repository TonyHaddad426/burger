import * as actionTypes from "./actionsTypes";
import axios from "../../axios-orders";
// ACTION CREATOR FOR THE PURCHASE_BURGER_SUCCESS action

export const purchaseBurgerSuccess = (id, orderData) => {
  // (id) is the expected id of the newly created order
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

// ACTION CREATOR FOR THE PURCHASE_BURGER_FAIL action

export const purchaseBurgerFail = error => {
  // (id) is the expected id of the newly created order
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START // return a js object where the
  };
};

// action we dispatch from the container when we click the order button
export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart()); // this dispatches the above function right at the start
    
    axios
      .post("/orders.json?auth="+token, orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};


// create an action for the purchase init dispatch

export const purchaseInit = () => {
    return { // in order to make this action usable by components, export it from the actions/index.js file
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {

    return {
      type: actionTypes.FETCH_ORDERS_SUCCESS,
      orders: orders
    };
  };

  export const fetchOrdersFail = (error) => {

    return {
      type: actionTypes.FETCH_ORDERS_FAIL,
      error: error
    };
  };

  export const fetchOrdersStart = () => {

    return {
      type: actionTypes.FETCH_ORDERS_START
    };
  };

  // this is a constant that runs asynch-code - this is seperate from the action types defined in the actionTypes folder
  export const fetchOrders = (token, userId) => { 

      return dispatch  => {
          dispatch(fetchOrdersStart());
          const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"'; // only fetch the data where the userId in Firebase is equal to
        axios
        .get("orders.json"+queryParams)
        .then(res => {
            //turn the objects received from FireBase into an array 
            const fetchedOrders=[]; 
            for (let key in res.data) { // change the data fetched from the back end here... not in the reducer
              fetchedOrders.push({
                  ...res.data[key],
                  id: key
              })
            }
          
          dispatch(fetchOrdersSuccess(fetchedOrders)); // the fetchedOrders are then passed on to the fetchOrdersSuccess reducer
        })
        .catch(err => {
         dispatch(fetchOrdersFail(err));
        });
      }

  };