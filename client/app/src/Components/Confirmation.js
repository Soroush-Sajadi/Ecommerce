import React, {Component} from "react";
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
          <div >
            <h1 className="confirm">Way to go its done!</h1>
            <h1 className="confirm">Tack {this.props.buyerName}!</h1>
            <h1 className="confirm">Your code is {this.props.userId}</h1>

          </div>
      )
  }
}