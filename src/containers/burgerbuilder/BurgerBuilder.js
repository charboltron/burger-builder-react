import React, { Component, Fragment } from 'react';
import Burger from '../../components/burger/Burger'
import BuildControls from '../../components/burger/build-controls/BuildControls';

const INGREDIENT_PRICES = {
  salad: .5, 
  cheese: .4,
  meat: 1.3, 
  bacon: .7
};

export class BurgerBuilder extends Component {
  
  state = {
    ingredients: {
      salad: 0, 
      bacon: 0, 
      cheese:0, 
      meat: 0, 
    },
    totalPrice: 4
  }
  
  addIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[type]+1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type]=updatedCount;
    const newPrice = this.state.totalPrice+INGREDIENT_PRICES[type];
    this.setState({ingredients:updatedIngredients, totalPrice:newPrice});
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount !== 0){
      const updatedCount = oldCount-1;
      const updatedIngredients = {...this.state.ingredients};
      updatedIngredients[type]=updatedCount;
      const newPrice = this.state.totalPrice-INGREDIENT_PRICES[type];
      this.setState({ingredients:updatedIngredients, totalPrice:newPrice});
    }
  }

  render() {
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
        ingredientAdded={this.addIngredientHandler}
        ingredientRemoved={this.removeIngredientHandler}
        />
      </Fragment>
    )
  }
}

export default BurgerBuilder
