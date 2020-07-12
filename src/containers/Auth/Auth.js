import React, { Component } from 'react'; 
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';

class Auth extends Component { 
    state = {
        controls: {
            email: {
              elementType: "input",
              elementConfig: {
                type: "email",
                placeholder: "email address"
              },
              value: '',
              validation: {
                  required: true,
                  isEmail: true
              }, 
              valid: false,
              touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                  type: "password",
                  placeholder: "password"
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                }, 
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }
componentDidMount() { 
if (!this.props.buildingBurger && this.props.authRedirectPath){
    this.props.onSetAuthRedirectPath();
}
}
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
    inputChangedHandler = (event, controlName) => {

        const updatedControls = { 
            ...this.state.controls, 
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation ), 
                touched: true
            },
        }
        this.setState({controls: updatedControls})
    }

   submitHandler = (event) => {
       event.preventDefault(); // prevents the reloading of the page
       this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup); //
   }

   switchAuthModeHandler = () => {
       this.setState(prevState => {
           return {
               isSignup: !prevState.isSignup // isSignup equal to the inverse of previous state sign up value 
           }
       })
   }
    render() { 
        // converts state object into an array that can be looped through
        const formElementsArray = [];
        // the keys are going to be name, street, zip code, etc..
        // if we access orderForm for a speciic key, we get the deeper key value pairs... elementType, elementConfig
        for (let key in this.state.controls) {
          // push new object to the formElementsArray
          formElementsArray.push({
            id: key, // this stores the highest level key value pairs into the id object
            config: this.state.controls[key] // this stores the children values into the config object
          });
        }
            // dynamically generated set of inputs
        let form = formElementsArray.map(formElement => ( 
                <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched = {formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                > 
                </Input>
               
        ))
        if (this.props.loading) {
            form = <Spinner></Spinner>
        }
       let errorMessage = null;
        if (this.props.error) {
            errorMessage = ( 
                <p>{this.props.error.message}</p>
            )
        }

            let authRedirect = null;
        if (this.props.isAuthenticated) {
           authRedirect = <Redirect to={this.props.authRedirectPath}></Redirect>
        }
            return (
                    <div className = {classes.Auth}> 
                    {authRedirect}
                    {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                <Button btnType="Success">SUBMIT</Button>
                <Button 
                btnType="Danger"
                clicked={this.switchAuthModeHandler}
                >
                Siwtch to {this.state.isSignup ? 'SIGNIN':'SIGNUP'}
                </Button>
                </form>
                    </div>

            )

    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email,password,isSignup)), // now we can execute onAuth in this container and we want to implement it whenever the form is submitted
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth); 