import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import {createStore, applyMiddleware, compose, combineReducers} from "redux"
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import thunk from 'redux-thunk'
import authReducer from './store/reducers/Auth'
import orderReducer from './store/reducers/orders' // import the combined Reducer


const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] dispatching', action);
            const result = next(action);
            console.log('[Middleware next state', store.getState());
            return result; 
        }
    }
};
// use this to let Redux Developer Chrome Extension aware of your state
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create a new constant to combine the reducers - pass the reducers as objects 
// pass the root reducer to create store function 
const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer, // assign burger builder reducer
    order: orderReducer, // assign order reducer
    auth: authReducer // assign user authentication reducer
})


// the second argument is an enhancer (middleware)
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk))); 

// the Provider should wrap everything
const app = (
    // connect the central store created by Redux to the React app by passing the store created above as a prop 
    // to the Provider tag
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
