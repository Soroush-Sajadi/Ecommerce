import React, {Component} from "react";
import { NavLink } from 'react-router-dom';
import cart from '../Images/cartIcon.png'
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

  componentDidMount = () => {
    this.getTheLocalData('Cart');
  }
    
      
    render() {
      console.log('CAAAART____',this.state.data)
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
              <NavLink to="/produkter/cart"  activeClassName="navbar__link--active" > <img className="cart" src={cart}/></NavLink>
              </nav>   
          </header>
      )
  }
}