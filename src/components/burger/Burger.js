import React from 'react';
import styles from './Burger.module.css';
import Ingredient from './ingredients/Ingredient'

const Burger = props => {
  
  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingredientKey => {
      return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
        return <Ingredient key={ingredientKey+i} type={ingredientKey} />
      })
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);
  
  if(transformedIngredients.length===0){
    transformedIngredients=<p>Please begin by adding ingredients.</p>
  };
  return (
    <div className={styles.Burger}>
      <Ingredient type="bread-top"/>
      {transformedIngredients}
      <Ingredient type="bread-bottom"/>
    </div>
  )
}

export default Burger
