import React from 'react';
import styles from './Burger.module.css';
import Ingredient from './ingredients/Ingredient'

const Burger = props => {
  const transformedIngredients = Object.keys(props.ingredients)
    .map(ingredient => );
  return (
    <div className={styles.Burger}>
      <Ingredient type="bread-top"/>
      <Ingredient type="cheese"/>
      <Ingredient type="meat"/>
      <Ingredient type="bread-bottom"/>
    </div>
  )
}

export default Burger
