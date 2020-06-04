import React, {Component} from "react";
import { NavLink } from 'react-router-dom';
import cart from '../Images/cartIcon.png';
import './header.css';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  getTheLocalData = (name) => {
    this.setState({ data: JSON.parse(window.localStorage.getItem(`${name}`))});
  }

  saveDataInState = async () => {
    if (this.props.lengthOfCart === 0) {
      await this.getTheLocalData('LenghthOfCart')
    } else {
      await this.setState({data: this.props.lengthOfCart})
    }
  }

  componentDidMount = () => {
    this.saveDataInState()
  }

  componentDidUpdate = (prevProp) => {
    if (prevProp.lengthOfCart !== this.props.lengthOfCart) {
      this.saveDataInState();
    }
  }

  render() {
    return (
      <header className="header">
        <nav className="navigator">
          <ul>
            <li >
              <NavLink exact={true} to="/" activeClassName="navbar__link--active">HEM</NavLink>
            </li>
            <li>
              <NavLink  exact={true} to="/produkter" activeClassName="navbar__link--active">PRODUKTER</NavLink>
            </li>
            <li>
              <NavLink to="/omoss" activeClassName="navbar__link--active">OM OSS</NavLink>
            </li>
          </ul>
          <NavLink to="/produkter/cart"  activeClassName="navbar__link--active" > 
          {this.state.data > 0 ? <img className="cart" src={cart}/>: null} 
          </NavLink>
          <h1 className="cart-length" style={ this.state.data > 0 ? {backgroundColor: 'red'}: null} > {this.state.data > 0 ? this.state.data : null}</h1>
          </nav>   
      </header>
    )
  }
}