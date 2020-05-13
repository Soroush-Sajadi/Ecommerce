import React, {Component} from "react";
import { NavLink } from 'react-router-dom';
import './Product.css'

export default class Produkt extends Component {
  constructor() {
    super()
    this.state = {
      data : [],
    }
  };

  getData = async (name) => {
    await fetch(`http://localhost:3000/products/${name}`) 
      .then(response => response.json())
      .then(data => { this.setState( { data } )
      })
  };

  componentDidMount = () => {
    this.getData(this.props.produktName)
  }

  selectedProduct = (e) => {
    const selectedItem = {
      name: e.target.getAttribute('name'),
      color: e.target.getAttribute('color'),
      size: e.target.getAttribute('size'),
      image: e.target.getAttribute('image'),
      description: e.target.getAttribute('description')
    }
    this.props.selectedProduct(selectedItem)
  }
    
  render() {
    return ( 
      <div className="wraper-card">
      {this.state.data.map(item => 
      <div class="flip-card">
       
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src={item.image1} alt="Avatar"  />
          </div>
          <div class="flip-card-back">
            <h2>{item.product_name}</h2> 
            <ul>
            <li >Color: {item.color}</li>
            <li>Size: {item.size}</li>
            <li>Price: 100 kr</li>
            <li className="description">{item.description} </li>
            </ul>
            
              <input type="Submit" value="Add To Cart"
                name={item.product_name}
                color={item.color}
                size={item.size}
                image={item.image1}
                description={item.description}
                onClick={this.selectedProduct}/>
          </div>
        </div>
       
      </div>
      )}
      <NavLink to={"/produkter/cart"}>
        <input type="submit" value="Till Kassan"  /> 
      </NavLink>
      </div>
    )
}
}