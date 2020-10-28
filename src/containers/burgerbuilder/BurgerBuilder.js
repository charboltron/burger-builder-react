import React, { Component, Fragment } from 'react';
import Burger from '../../components/burger/Burger'
import BuildControls from '../../components/burger/build-controls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/burger/order-summary/OrderSummary';
import withErrorHandler from '../../components/Error/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
  salad: .5, 
  cheese: .4,
  meat: 1.3, 
  bacon: .7
};

export class BurgerBuilder extends Component {
  
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false, 
    purchasing: false,
    loading: false,
    error: null
  }
  
  addIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[type]+1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type]=updatedCount;
    const newPrice = this.state.totalPrice+INGREDIENT_PRICES[type];
    this.setState({ingredients:updatedIngredients, totalPrice:newPrice});
    this.updatePurchaseState(updatedIngredients);
  }

  componentDidMount () {
    axios.get('https://react-my-burger-b492d.firebaseio.com/ingredients.json')
      .then(res => {
        this.setState({ingredients:res.data})
      })
      .catch(error =>{
        this.setState({error:true});
      });
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount !== 0){
      const updatedCount = oldCount-1;
      const updatedIngredients = {...this.state.ingredients};
      updatedIngredients[type]=updatedCount;
      const newPrice = this.state.totalPrice-INGREDIENT_PRICES[type];
      this.setState({ingredients:updatedIngredients, totalPrice:newPrice});
      this.updatePurchaseState(updatedIngredients);
    }
  }

  updatePurchaseState(ingredients) {

    const sum = Object.keys(ingredients)
      .map(ingredientKey => {
        return ingredients[ingredientKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({purchasable: sum > 0});
  }

  purchaseHandler = () => {this.setState({purchasing: true})};

  purchaseCancelHandler = () => {this.setState({purchasing: false})} 
  
  purchaseContinueHandler = async () => {
    const queryParams = [];
    for (let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString 
    });
  } 


  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key]<=0
    }
    
    let orderSummary = null;        

    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;
    if (this.state.ingredients) {
      burger =  (
        <Fragment>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}/>
        </Fragment>
      );
      orderSummary =         
        <OrderSummary 
          price={this.state.totalPrice.toFixed(2)}
          ingredients={this.state.ingredients}
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

export default withErrorHandler(BurgerBuilder, axios);
