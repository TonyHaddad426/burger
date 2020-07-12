import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions/index'; // allows you to dispatch the actions in the index file

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name"
        },
        value: '',
        validation: {
            required: true
        }, 
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        value: '',
        validation: {
            required: true,
            minLength: 5,
            maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: '',
        validation: {
            required: true
        }, 
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your e-mail"
        },
        value: '',
        validation: {
            required: true
        }, 
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        valid: true,
        validation: {},
        value: 'fastest'
      }
    },
    formIsValid: false,
  
  };

  // the rules argument refers to

checkValidity(value, rules) {
    let isValid = true;

    if (!rules) { // if no validation rules are defined always return true for formIsValid
      return true;
    }

    if (rules.required) {
        // if the trimmed value is not equal to an empty string, isValid will be true
        isValid = value.trim() !== ' ' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }
    // console.log(isValid)
    return isValid;
}

  orderHandler = event => {
    event.preventDefault();
    // this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
        formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value

    }
    // you should recalculate the price on the server side?
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData, // user input data from the form
      userId: this.props.userId
    };
    //dispatch actions are always received as props
    this.props.onOrderBurger(order, this.props.token)

    // THIS CODE HAS BEEN HANDLED VIA REDUX
    // axios
    //   .post("/orders.json", order)
    //   .then(response => {
    //     this.setState({ loading: false });
    //     this.props.history.push("/");
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false });
    //   });
  };
  inputChangedHandler = (event, inputIdentifier) => {
      const updatedOrderForm = {...this.state.orderForm} // this will only store the highest level key values of the state
      const updatedFormElement = {...updatedOrderForm[inputIdentifier]} // this stores the deeper values of the state
      updatedFormElement.value = event.target.value; // this stores the value passed by the event (user input) 
      // the below stores the result of the check into the valid property
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
      updatedFormElement.touched=true;
      // console.log(updatedFormElement)
      updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true; 
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
            console.log(formIsValid = updatedOrderForm[inputIdentifier].valid)
        }
        // console.log(formIsValid)
      this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }
  // must turn the orderForm object into an arrary
  render() {
    const formElementsArray = [];
    // the keys are going to be name, street, zip code, etc..
    // if we access orderForm for a speciic key, we get the deeper key value pairs... elementType, elementConfig
    for (let key in this.state.orderForm) {
      // push new object to the formElementsArray
      formElementsArray.push({
        id: key, // this stores the highest level key value pairs into the id object
        config: this.state.orderForm[key] // this stores the children values into the config object
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {/* loop through the formElementsArray and generate a new array that returns JSX (the custom inputs) */}
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched = {formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToPRops = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice, 
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

// connect container to the new actions created

const mapDispatchToProps = dispatch => {
  // onOrderBurger should be called in the orderHandler function above
  return {
  onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))     // execute an anonymous func where the action created purchase burger start is dispatched
  }
}

export default connect(mapStateToPRops,mapDispatchToProps)(withErrorHandler(ContactData,axios));
