import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom"; //
import ContactData from "../../containers/Checkout/ContactData/ContactData";
import { connect } from "react-redux";


class Checkout extends Component { 

  // componentWillMount () { // here we want to dispatch the purchaseInit action
  //   this.props.onInitPurchase();
  // }


  // state = { THIS IS NOW HANDLED IN REDUX
  //   ingredients: null,
  //   price: 0

  // };

  // INSTEAD OF USING THE BELOW CODE TO PARSE QUERY PARAMETERS FROM THE URL - USE REDUX INSTEAD
  // componentWillMount() {
  //
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   // loop through all of the ingredients and then push them onto the ingredients array defined above
  //   for (let param of query.entries()) {

  //     if (param[0] === "price") {
  //       price = param[1];
  //     } else {
  //       // query.entries() will have the following form: ['salad', 1]
  //       ingredients[param[0]] = +param[1]; // adding the + converts param[1] into a number
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, totalPrice: price });
  // }
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
   let summary = <Redirect to="/" />; // Redirect to the root page or the Burger Builder page
   
   // the summary should not redirect if the ingredients are available 
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/"></Redirect> : null;// we want to redirect to burger builder page if purchased: true
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            //   pass props from checkout.js to ContactData.js so that the history prop can be used to redirect the user back to
            // the home page after they've submitted their order
            component={ContactData}
          />
        </div>
      );
    }
    return summary ;
  }
}

// function which gets the state and returns a js object where we map state to the props of this container
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice, 
    purchased: state.order.purchased
  };
};
// 
// const mapDispatchToProps = dispatch => {
//   return {
//     // hoolds an anonymous function that dispatches the action import from the index.js file above
//     onInitPurchase: () => dispatch(actions.purchaseInit())
//   }
// }
export default connect(mapStateToProps, )(Checkout);
