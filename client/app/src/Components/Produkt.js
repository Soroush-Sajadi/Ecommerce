import React, {Component} from "react";
import { NavLink } from 'react-router-dom';
import './Product.css'

export default class Produkt extends Component {
  constructor() {
    super()
    this.state = {
      data : [] ,
      clicked: 'Remove from cart',
      localData: [],
    }
  };

  getData = async (name) => {
      await fetch(`http://localhost:3000/products/${name}`) 
        .then(response => response.json())
        .then(data => { this.setState( { data } )
      })
    this.addStatus();
  }

  addStatus = () => {
    for (let i in this.state.data) {
      this.setState( {checked: this.state.data[i].checked = false})
    }
  }

  saveToLocalStorage = (name) => {
    window.localStorage.setItem(`${name}`, JSON.stringify(this.state.data))
  }

  getTheLocalData = (name) => {
    return this.setState({ data: JSON.parse(window.localStorage.getItem(`${name}`))});
  }

  changingStatus = (id) => {
    for (let i in this.state.data) {
      if (id === this.state.data[i].id) {
      this.setState( ({clicked: this.state.data[i].checked = !this.state.data[i].checked}));
      }
    }
    this.saveToLocalStorage(this.props.produktName)
  }


  componentDidMount = (prevProps) => {
    if (!(JSON.parse(window.localStorage.getItem(`${this.props.produktName}`)))) {
      this.getData(this.props.produktName);
    } else {
        this.getTheLocalData(this.props.produktName);
    }
  }

  
  sendingProductToCart = (selectedItem, cartStatus, id ) => {
    return this.props.selectedProduct(selectedItem, cartStatus, id);
  }

  selectedProduct = (e) => {
    const selectedItem = {
      id : e.target.getAttribute('id'),
      name: e.target.getAttribute('name'),
      color: e.target.getAttribute('color'),
      price: e.target.getAttribute('price'),
      size: e.target.getAttribute('size'),
      image: e.target.getAttribute('image'),
      description: e.target.getAttribute('description'),
    }
    this.changingStatus(e.target.getAttribute('id'))
    this.sendingProductToCart(selectedItem, e.target.getAttribute('value'), e.target.getAttribute('id'))
    
    //this.setState(prevState => ({clicked: !prevState.clicked}));
  }

  render() {
    return ( 
      <>
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
              <li>Price: {item.price}</li>
              <li className="description">{item.description} </li>
            </ul>

              <input className={item.checked === false ? 'inputAddToCart' : 'inputRemoveFromCart'} type="Submit" value={item.checked === false ? 'Add to the cart' : 'Remove from cart' }
                name={item.product_name}
                id={item.id}
                checked={item.checked}
                price={item.price}
                color={item.color}
                size={item.size}
                image={item.image1}
                description={item.description}
                onClick={this.selectedProduct}/>
          </div>
        </div>
      </div>
      )}
      </div>
      <div>
        <ul className="tillKassan">
          <li>
            <NavLink className="kassan" to={"/produkter/"}> Till backa </NavLink>
          </li>
          <li>
            <NavLink to={"/produkter/cart"}> Till Kassan </NavLink>
          </li>
      </ul>
      </div>
      
      </>
    )
}
}