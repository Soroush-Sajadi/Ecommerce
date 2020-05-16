import React, {Component} from "react";
import { NavLink } from 'react-router-dom';
import './Product.css'

export default class Produkt extends Component {
  constructor() {
    super()
    this.state = {
      data : [],
      clicked: 'Add to the cart',
    }
  };

  getData = async (name) => {
    await fetch(`http://localhost:3000/products/${name}`) 
      .then(response => response.json())
      .then(data => { this.setState( { data } )
      })
      this.addStatus();
  };

  addStatus = () => {
    for (let i in this.state.data) {
      this.setState( {checked: this.state.data[i].checked = false})
      
    }
  }

  changingStatus = (id) => {
    for (let i in this.state.data) {
      if (id === this.state.data[i].id) {
      this.setState ({checked: this.state.data[i].checked = this.state.clicked});
      }
    }
  }
  
  

  componentDidMount = () => {
    this.getData(this.props.produktName)
    
  }

  selectedProduct = (e) => {
    console.log(e.target.getAttribute('id'))
    const selectedItem = {
      id : e.target.getAttribute('id'),
      name: e.target.getAttribute('name'),
      color: e.target.getAttribute('color'),
      size: e.target.getAttribute('size'),
      image: e.target.getAttribute('image'),
      description: e.target.getAttribute('description')
    }
    this.props.selectedProduct(selectedItem, this.state.clicked);
    this.changingStatus(e.target.getAttribute('id'))
    //this.setState(prevState => ({clicked: !prevState.clicked}));
    this.state.clicked === 'Add to the cart' ? this.setState({clicked: 'Remove from cart'}):this.setState({clicked: 'Add to the cart'});
  }
    
  render() {
    console.log(this.state.data)
    return ( 
      <div className="wraper-card">
      {this.state.data.map(item => 
      <div className="flip-card">
       
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={item.image1} alt="Avatar"  />
          </div>
          <div className="flip-card-back">
            <h2>{item.product_name}</h2> 
            <ul>
            <li >Color: {item.color}</li>
            <li>Size: {item.size}</li>
            <li>Price: 100 kr</li>
            <li className="description">{item.description} </li>
            </ul>

              <input type="Submit" value={this.state.clicked}
                name={item.product_name}
                id = {item.id}
                color={item.color}
                size={item.size}
                image={item.image1}
                description={item.description}
                onClick={this.selectedProduct}/>
          </div>
        </div>
       
      </div>
      )}
      <div>
      <NavLink to={"/produkter/cart"}>
         <input className="tillKassan" type="submit" value="Till Kassan"  /> 
      </NavLink>
      </div>
      </div>
    )
}
}