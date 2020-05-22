import React, {Component} from "react";
import { NavLink } from 'react-router-dom';
import './Cart.css'

export default class Produkter extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data : [],
        localData: []
      }
    }

    componentDidMount = () => {
      this.saveInState();
    }

    saveInState = () => {
      if (this.props.cartInfo.length !== 0) {
        this.setState(state => {
          const localData = state.localData.concat(this.props.cartInfo)
          return {
            localData
          };
        })
      }
      console.log(this.state.localData)
      this.saveInLocal()
    }

    saveInLocal = () => {
      
      window.localStorage.setItem('Cart', JSON.stringify(this.props.cartInfo))
      this.getTheLocalData();
    }

    getTheLocalData = () => {
      return this.setState({ data: JSON.parse(window.localStorage.getItem(`Cart`))});
    }

   

    removeFromCart = () => {

    }

    render() {
      return ( 
        <div className="wraper">
        {this.state.data.map(item => 
          <div className="cart">
            <img src={item.image} />
          <ul className="cart-wraper">
            <li className="li-title">{item.name}</li>
            <li className="li-info">{item.color}</li>
            <li className="li-desc">{item.description}</li>
          </ul>
            <input type="submit" value="Ta bort" id={item.id} onClick={this.removeFromCart} />
          </div>
          )} 
          {this.props.cartInfo.length !== 0 ? (<NavLink to={"/produkter/"+ this.props.cartInfo[ (this.props.cartInfo.length) - 1 ].name }> tillbacks</NavLink>):null}
        </div>  
      )
  }
}