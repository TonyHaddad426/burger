import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import {connect} from 'react-redux';

// this component is used to implement the toolbar and burger builder

// in the main area we will output the component we wrap with this layout: props.children

//  the const layout function below allows us to dynamically wrap this layout component around any of the children components.
// the {props.children} represents the argument (or child component) to be wrapped by the Layout component

// AUX (a higher order component) serves the purpose of allowing us to display adjacent components

class Layout extends Component {
    // state should contain info as to whether the side drawer is visible or not
state = {

showSideDrawer: false

}
sideDrawerCloseHandler = () => {
this.setState({showSideDrawer: false});


}
sideDrawerToggleHandler = () => {
// if you are changing the state based on an older iteration of the state you must use the below function syntax due to the asynchronous nature of setState 
  this.setState((prevState)=> {
return {showSideDrawer: !prevState.showSideDrawer};
  });
}

  render() {
      return(
    <Aux>
      <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler}></Toolbar>
      <SideDrawer isAuth={this.props.isAuthenticated} open = {this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
      <main className={classes.Content}>{this.props.children}</main>
    </Aux>
      );
  }
}

const mapStateToProps = (state) => {
  return {
     isAuthenticated: state.auth.token != null
  }
}

export default connect(mapStateToProps)(Layout);
