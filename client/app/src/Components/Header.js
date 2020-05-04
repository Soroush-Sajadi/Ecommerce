import React, {Component} from "react";
import { NavLink } from 'react-router-dom';



export default class Header extends Component {
    
      
      render() {
        return (  
            <header className="header">
              <nav className="navigator">
                <ul>
                  <li>
                    <NavLink to="/">Hem</NavLink>
                  </li>
                  <li>
                    <NavLink to="/produkter">Produkter</NavLink>
                  </li>
                  <li>
                    <NavLink to="omoss">Om oss</NavLink>
                  </li>
                </ul>
                </nav>   
            </header>
        )
    }
}