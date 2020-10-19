import React, { Component, Fragment } from 'react';
import Burger from '../../components/burger/Burger'
import moduleName from '../../components/burger/build-controls/BuildControls';
import BuildControls from '../../components/burger/build-controls/BuildControls';

export class BurgerBuilder extends Component {
  
  state = {
    ingredients: {
      salad: 0, 
      bacon: 0, 
      cheese:0, 
      meat: 0, 
    }
  }
  
  render() {
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls/>
      </Fragment>
    )
  }
}

export default BurgerBuilder
