import React from 'react'
import styles from './Toolbar.module.css'
import Logo from '../../../components/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => { 
  return (
      <header className={styles.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={styles.Logo}>
          <Logo height="80%"/>
        </div>
        <nav className={styles.DesktopOnly}>
          <NavigationItems/>  
        </nav>
      </header>
  )
}

export default Toolbar
