import React, { Component } from "react";
import classes from "./BurgerIngredient.module.css";
import PropTypes from "prop-types";

class BurgerIngredient extends Component {
  render() {
    let ingredient = null;
    switch (this.props.type) {
      case "bread-bottom":
        ingredient = <div className={classes.BreadBottom} />;
        break;

      case "bread-top":
        ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1} />
            <div className={classes.Seeds2} />
          </div>
        );
        break;

      case "meat":
        ingredient = <div className={classes.Meat} />;
        break;

      case "cheese":
        ingredient = <div className={classes.Cheese} />;
        break;

      case "salad":
        ingredient = <div className={classes.Salad} />;
        break;

      case "bacon":
        ingredient = <div className={classes.Bacon} />;
        break;

      default:
        ingredient = null;
    }
    return ingredient;
  }
}

// if we ever try to use the ingredient component without passing a type thst is a string we will get an error
BurgerIngredient.propTypes = {
type: PropTypes.string.isRequired

}


export default BurgerIngredient;
