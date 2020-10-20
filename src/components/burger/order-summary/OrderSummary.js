import React, {Component, Fragment} from 'react'
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

  componentDidUpdate(){
    console.log('[OrderSummary] did update');
  }

  render () {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(ingredientKey => {
      return( 
        <li key={ingredientKey}>
          <span style={{textTransform: 'capitalize'}}>{ingredientKey}</span>: {this.props.ingredients[ingredientKey]}
        </li>
      ) 
    });
    return (
      <Fragment>  
        <h3>Your Order</h3>
        <p>A delicious burger with: </p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price}</strong></p>
        <p>Continue to Checkout? </p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Fragment>
    )
  }
}

export default OrderSummary
