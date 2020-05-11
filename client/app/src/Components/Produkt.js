import React, {Component} from "react";
import { NavLink } from 'react-router-dom';
import './Product.css'

export default class Produkt extends Component {
  constructor() {
    super()
    this.state = {
      data : [],
      selectedItem: null,
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
    const a =(e.target.getAttribute('attr'));
  }
    
  render() {
    return ( 
      <div classNameName="card-wraper"> 
      {this.state.data.map(item =>
          <div className="container page-wrapper">
          <div className="page-inner">
            <div className="row">
              <div className="el-wrapper">
                <div className="box-up">
                  <img className="img" src={item.image1} alt={item.product_name} />
                  <div className="img-info">
                    <div className="info-inner">
                      <span className="p-name">{item.product_name}</span>
                      <span className="p-company">MoMoSyr</span>
                    </div>
                    <div className="a-size"><span className="size">Size: {item.size} Color: {item.color}</span></div>
                  </div>
                </div>
        
                <div className="box-down">
                  <div className="h-bg">
                    <div className="h-bg-inner"></div>
                  </div>
        
                  <a className="cart" href="#">
                    <span className="price">$120</span>
                    <span className="add-to-cart">
                    <NavLink to={"/produkter/" + this.props.produktName + "/cart"}><span className="txt" attr={item} onClick={this.selectedProduct}>Add in cart</span> </NavLink>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
              
        )}
         
      </div>
    )
}
}