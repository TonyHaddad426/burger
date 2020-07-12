import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders"
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import {connect} from 'react-redux'; 

import * as actions from "../../store/actions/index";

class burgerBuilder extends Component {
  state = {
    purchasing: false, // state used to conditionally show or hide the modal -> local UI state
    
  };
  componentDidMount() {
    // axios
    //   .get("https://testdb-79d62.firebaseio.com/orders/Ingredients.json")
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({ error: true });
    //   });
    this.props.onInitIngredients(); // to load saved state when the screen loads you must dispatch from componentDidMount()

  }
  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({purchasing: true})
    } else {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth'); // pushes the user to the authentication page
    }
    this.setState({ purchasing: true });
  };

  updatePurchaseState(ingredients) {
    //
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;  // if sum is greater than 0 store true in purchasable
  }

  // addIngredientHandler = type => {
  //   // to add an ingredient we need to know the old
  //   const oldCount = this.state.ingredients[type];
  //   // calculate the new count which is the old count + 1

  //   const updatedCount = oldCount + 1;
  //   // state should be updated in an immutable way so copy the contents of the old state using the spread operator
  //   const updatedIngredients = { ...this.state.ingredients };
  //   updatedIngredients[type] = updatedCount;

  //   const priceAddition = INGREDIENT_PRICES[type];
  //   console.log(priceAddition);
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;

  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // removeIngredientHandler = type => {
  //   // to remove an ingredient we need to know the old count
  //   const oldCount = this.state.ingredients[type];
  //   // calculate the new count which is the old count + 1
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   // state should be updated in an immutable way so copy the contents of the old state using the spread operator
  //   const updatedIngredients = { ...this.state.ingredients };
  //   updatedIngredients[type] = updatedCount;

  //   const priceAddition = INGREDIENT_PRICES[type];

  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceAddition;

  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    //     //alert("You continue");
// INSTEAD OF USING THE BELOW CODE TO PASS PARAMETERS VIA URL - USE REDUX INSTEAD
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   ); // encodes elements such that they can be used in the URL
    // }
    // queryParams.push('price='+this.state.totalPrice); // price is now passed as a query parameter
    // const queryString = queryParams.join("&");

    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString
    // }); // this allows you to push a new page onto the current stack of pages
    this.props.onInitPurchase();
    this.props.history.push('/checkout'); // this allows you to push a new page onto the current stack of pages
  };
  // we must pass this ingredients array to the burger component

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; // this will store true or false
    } // {salad: true, meat: false, etc.} ... if true than the ctrl.type should be disabled
    let orderSummary = null;

    let burger = this.props.error ? (
      <p> Ingredients can't be loaded </p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            ordered={this.purchaseHandler}
            purchasable={this.updatePurchaseState(this.props.ings)}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    // since Asynchronous code is being handled by Redux we do not need the below code anymore
    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

    // display the graphical representation of the Burger
    // display the controls to manipulate the graphic design
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {" "}
          {orderSummary}{" "}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
// holds a function which receives the state automatically and returns the js obeject which defines which property should hold which slice of the state
const mapStateToProps = state => {
  return {
      // when combining reducers you must
    ings: state.burgerBuilder.ingredients, // gets access to the ingredients property in our state defined in the reducer
    price: state.burgerBuilder.totalPrice, // gets access to the totalPrice property in our state defined in the reducer
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token != null
  };
}

// this receives a function which holds the dispatch function as an argument
// returns a function with props matching function
const mapDispatchToProps = dispatch => {
return {
  // you need to pass the action type and the ingredient name
  onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
  onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
  onInitIngredients: () => dispatch(actions.initIngredients()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
  onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
}

}

// the connect method connects this component to the store
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));
