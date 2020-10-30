import React, { Component, Fragment } from 'react';
import Burger from '../../components/burger/Burger'
import BuildControls from '../../components/burger/build-controls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/burger/order-summary/OrderSummary';
import withErrorHandler from '../../components/Error/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions'

export class BurgerBuilder extends Component {
  
  state = {
    totalPrice: 4,
    purchasing: false,
    loading: false,
    error: null
  }
  

  componentDidMount () {
    // axios.get('https://react-my-burger-b492d.firebaseio.com/ingredients.json')
    //   .then(res => {
    //     this.setState({ingredients:res.data})
    //   })
    //   .catch(error =>{
    //     this.setState({error:true});
    //   });
  }

  updatePurchaseState(ingredients) {

    const sum = Object.keys(ingredients)
      .map(ingredientKey => {
        return ingredients[ingredientKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {this.setState({purchasing: true})};

  purchaseCancelHandler = () => {this.setState({purchasing: false})} 
  
  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  } 


  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key]<=0
    }
    
    let orderSummary = null;        

    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;
    if (this.props.ings) {
      burger =  (
        <Fragment>
          <Burger ingredients={this.props.ings}/>
          <BuildControls 
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabled={disabledInfo}
          price={this.props.price}
          purchasable={this.updatePurchaseState(this.props.ings)}
          ordered={this.purchaseHandler}/>
        </Fragment>
      );
      orderSummary =         
        <OrderSummary 
          price={this.props.price}
          ingredients={this.props.ings}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        /> 
    }
    if (this.state.loading) {
      orderSummary = <Spinner/>;
    } 

    return (
      <Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings:state.ingredients,
    price:state.totalPrice.toFixed(2)
  }
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ing) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ing}),
    onIngredientRemoved: (ing) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ing})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler(BurgerBuilder, axios));
