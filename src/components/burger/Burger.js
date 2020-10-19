import React from 'react';
import styles from './Burger.module.css';
import Ingredient from './ingredients/Ingredient'

const Burger = props => {
  
  const transformedIngredients = Object.keys(props.ingredients)
    .map(ingredientKey => {
      return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
        return <Ingredient key={ingredientKey+i} type={ingredientKey} />
      })
    });
  return (
    <div className={styles.Burger}>
      <Ingredient type="bread-top"/>
      {transformedIngredients}
      <Ingredient type="bread-bottom"/>
    </div>
  )
}

export default Burger
