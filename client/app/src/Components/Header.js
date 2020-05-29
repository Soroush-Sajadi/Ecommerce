import React, {Component} from "react";
import { NavLink } from 'react-router-dom';
import cart from '../Images/cart.png'
import './header.css';



export default class Header extends Component {
    
      
      render() {
        return (  
            <header className="header">
              <nav className="navigator">
                <ul>
                  <li >
                    <NavLink to="/" activeClassName="navbar__link--active">HEM</NavLink>
                  </li>
                  <li>
                    <NavLink to="/produkter" activeClassName="navbar__link--active">PRODUKTER</NavLink>
                  </li>
                  <li>
                    <NavLink to="/omoss" activeClassName="navbar__link--active">OM OSS</NavLink>
                  </li>
                  <li>
                    <NavLink to="/produkter/cart" > <img className="cart" src={cart}/></NavLink>
                  </li>
                </ul>
                </nav>   
            </header>
        )
    }
}