import React, {Component} from "react";
import {NavLink} from 'react-router-dom';
import './Confirmation.css'
export default class Confirmation extends Component {

    clearLocalSrorage = () => {
      window.localStorage.clear();
    }
    
    componentDidMount = () => {
      this.clearLocalSrorage();
      this.props.deleteCart()
      this.props.deleteSelectedProduct()
    }
      
    render() {
      return (  
          <div className="confirm-wraper" >
            <h1 className="confirm1">Way to go, its done!</h1>
            <h1 className="confirm">Thank you {this.props.buyerName}!</h1>
            <h1 className="confirm">Your code: {this.props.userId}</h1>
            <NavLink to="/">
              <input value='Tillbacka Hem' type='submit' />
            </NavLink>

          </div>
      )
  }
}