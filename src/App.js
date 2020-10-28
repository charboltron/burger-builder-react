import React, { Component } from 'react';
import Layout from './components/layout/Layout';
import Checkout from './containers/checkout/Checkout';
import BurgerBuilder from './containers/burgerbuilder/BurgerBuilder'
import Orders from './containers/orders/Orders';
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div >
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout}/>
            <Route path='/orders' component={Orders}/>
            <Route exact path='/' component={BurgerBuilder}/>
          </Switch>
        </Layout> 
      </div>
    );
  }
}

export default App;
