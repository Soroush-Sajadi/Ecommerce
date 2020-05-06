import React, {Component} from "react";
import './Product.css'

export default class Produkt extends Component {
  constructor() {
    super()
    this.state = {
      data : []
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
    
  render() {
    console.log(this.state.data.map(item => item))
    return ( 
      <div classNameName="card-wraper"> 
      {this.state.data.map(item =>
          <div className="container page-wrapper">
          <div className="page-inner">
            <div className="row">
              <div className="el-wrapper">
                <div className="box-up">
                  <img className="img" src={item.image1} alt="" />
                  <div className="img-info">
                    <div className="info-inner">
                      <span className="p-name">I feel like Pablo</span>
                      <span className="p-company">Yeezy</span>
                    </div>
                    <div className="a-size">Available sizes : <span className="size">S , M , L , XL</span></div>
                  </div>
                </div>
        
                <div className="box-down">
                  <div className="h-bg">
                    <div className="h-bg-inner"></div>
                  </div>
        
                  <a className="cart" href="#">
                    <span className="price">$120</span>
                    <span className="add-to-cart">
                      <span className="txt">Add in cart</span>
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