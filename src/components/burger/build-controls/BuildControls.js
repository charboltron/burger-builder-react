import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './build-control/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Meat', type: 'meat'},
];

const BuildControls = props => {
  return (
    <div className={styles.BuildControls}>
      <p>Current Price: <strong>{props.price}</strong></p>
      {controls.map(control=> (
        <BuildControl 
        key={control.label} 
        label={control.label}
        added={() => props.ingredientAdded(control.type)}
        removed={() => props.ingredientRemoved(control.type)}
        disabled={props.disabled[control.type]}
        />
      )
    )}
    <button 
      className={styles.OrderButton} 
      disabled={!props.purchasable}
      onClick={props.ordered}
      >ORDER NOW</button>
    </div>
  )
}

export default BuildControls
