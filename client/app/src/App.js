import React, {Component} from "react";
import { BrowserRouter, Switch, Route } from'react-router-dom';
import Produkter from './Components/Produkter';
import Hem from './Components/Hem';
import Omoss from './Components/Omoss'
import Header from './Components/Header';
import Produkt from './Components/Produkt'
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productRoute: null
    }
  }

  getProductRoute = (childData) => {
    this.setState({productRoute: childData})
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
      <>
          <div>
            <Header />
          </div>
          <Switch>
            <Route exact path="/" render={() => <Hem/>}/>  
            <Route exact path="/produkter" render={() => <Produkter routeName={this.getProductRoute}/>}/>
            <Route path="/omoss" render={() => <Omoss/>}/>
            <Route path={"/produkter/" + this.state.productRoute} render={() => <Produkt produktName={this.state.productRoute} />} />
          </Switch>
        </>
        </BrowserRouter>
      </div>
    );
  }
}

