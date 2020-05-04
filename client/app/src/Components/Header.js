import React, {Component} from "react";
import { NavLink } from 'react-router-dom';
import './header.css';



export default class Header extends Component {
    
      
      render() {
        return (  
            <header className="header">
              <nav className="navigator">
                
                <ul>
                <h5 className="brand">MoMo Syr</h5>
                  <li>
                    <NavLink to="/">HEM</NavLink>
                  </li>
                  <li>
                    <NavLink to="/produkter">PRODUKTER</NavLink>
                  </li>
                  <li>
                    <NavLink to="omoss">OM OSS</NavLink>
                  </li>
                </ul>
                </nav>   
            </header>
        )
    }
}