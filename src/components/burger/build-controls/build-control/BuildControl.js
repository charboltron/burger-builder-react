import React from 'react';
import classes from './BuildControl.module.css';
import styles from './BuildControl.module.css';


const BuildControl = props => {
  return (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{props.label}</div>
      <button className={styles.Less}>Less</button>
      <button className={styles.More}>More</button>
    </div>
  )
}

export default BuildControl;
