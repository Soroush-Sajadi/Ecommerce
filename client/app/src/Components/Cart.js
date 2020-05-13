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
        console.log(this.props.cartInfo.name)
        return (  
            <div className="category-card-wraper">
              <h1>{this.props.cartInfo.name}</h1>
              <h2>{this.props.cartInfo.color}</h2>
              <h3>{this.props.cartInfo.description}</h3>
            </div>
        )
    }
}