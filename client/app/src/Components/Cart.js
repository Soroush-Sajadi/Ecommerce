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
          <div>
          {this.props.cartInfo.map(item => 
            <div className="category-card-wraper">
              <h1>{item.name}</h1>
              <h2>{item.color}</h2>
              <h3>{item.description}</h3>
            </div>
            )} 
          </div>  
        )
    }
}