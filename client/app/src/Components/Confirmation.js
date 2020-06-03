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
          </div>
      )
  }
}