import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './build-control/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Meat', type: 'Meat'},
];

const BuildControls = props => {
  return (
    <div className={styles.BuildControls}>
      {controls.map(control=> (<BuildControl key={control.label} label={control.label}/>))}
    </div>
  )
}

export default BuildControls
