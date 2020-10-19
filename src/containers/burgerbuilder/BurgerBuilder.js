import React, { Component, Fragment } from 'react';
import Burger from '../../components/burger/Burger'

export class BurgerBuilder extends Component {
  
  state = {
    ingredients: {
      salad: 1, 
      bacon: 1, 
      cheese: 2, 
      meat: 2, 
    }
  }
  
  render() {
    return (
      <Fragment>
        <Burger {this.state.ingredients}/>
        <div>
          Build Controls
        </div>
      </Fragment>
    )
  }
}

export default BurgerBuilder