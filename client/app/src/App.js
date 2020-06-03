import React, {Component} from "react";
import { BrowserRouter, Switch, Route } from'react-router-dom';
import Produkter from './Components/Produkter';
import Hem from './Components/Hem';
import Omoss from './Components/Omoss'
import Header from './Components/Header';
import Produkt from './Components/Produkt'
import Cart from './Components/Cart'
import Checkout from './Components/Checkout';
import Confirmation from './Components/Confirmation';
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productRoute: null,
      selectedProductInfo :[],
      productsToDb:[],
      lengthOfCart: 0,
      id : null,
      buyerName: null
    }
  }

  getProductRoute = (childData) => {
    this.setState({productRoute: childData})
  }

  getLengthCartFromProduct = (childData) => {
    this.setState({lengthOfCart: childData})
  }

  getLengthCartFromCart = (childData) => {
    this.setState({lengthOfCart: childData})
  }

  getSelectedProduct = (childData, cartStatus, id ) => {
    if (cartStatus === 'Add to the cart') {
    this.setState(state => {
      const selectedProductInfo = state.selectedProductInfo.concat(childData)
      return {
        selectedProductInfo
      };
    }) 
  } else {
    let filteredArray = this.state.selectedProductInfo.filter(item => item.id !== id)
    this.setState({selectedProductInfo: filteredArray});
    }
  }

  deleteTheProps = (childData) => {
    this.setState({ selectedProductInfo: childData })
  }

  getIdConfirmation = (childData) => {
    this.setState({id: childData})
  }

  deleteCart = () => {
    this.setState({ lengthOfCart: 0 })
  }

  deleteSelectedProduct = () => {
    this.setState({selectedProductInfo: []})
  }

  getBuyerName = (childData) => {
    this.setState({ buyerName: childData })
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
      <>
          <div>
            <Header lengthOfCart={this.state.lengthOfCart}/>
          </div>
          <Switch>
            <Route exact path="/" render={() => <Hem/>}/>
            <Route exact path="/produkter" render={() => <Produkter routeName={this.getProductRoute}/>}/>
            <Route path="/omoss" render={() => <Omoss/>}/>
            <Route exact path={"/produkter/" + this.state.productRoute} render={() => <Produkt produktName={this.state.productRoute} selectedProduct={this.getSelectedProduct} getLengthCart={this.getLengthCartFromProduct} />} />
            <Route path={"/produkter/cart"} render={() => <Cart cartInfo={this.state.selectedProductInfo} deleteProps={this.deleteTheProps} toDataBase={this.getproductFromCartToDb} getLengthCart={this.getLengthCartFromCart} />} />
            <Route path={"/produkter/checkout"} render={() => <Checkout getId={this.getIdConfirmation} buyerName={this.getBuyerName} />} />
            <Route path={`/produkter/confirmation/${this.state.id}`} render={() => <Confirmation buyerName={this.state.buyerName} userId={this.state.id} deleteCart={this.deleteCart} deleteSelectedProduct={this.deleteSelectedProduct} />} />
          </Switch>
        </>
        </BrowserRouter>
      </div>
    );
  }
}

