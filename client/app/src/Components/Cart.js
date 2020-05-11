import React, {Component} from "react";
import { NavLink } from 'react-router-dom';
import './Category.css'

export default class Produkter extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data : []
      }
    }

   


      render() {
        return (  
            <div className="category-card-wraper">
              <h1>Cart</h1>
            </div>
        )
    }
}