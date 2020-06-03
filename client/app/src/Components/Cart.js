import React, {Component} from "react";
import { NavLink, Redirect } from 'react-router-dom';
import './Cart.css'

export default class Produkter extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dataFromProduct : [],
        localData: [],
        totalPrice: [],
        total: null,
        lengthCart : 0,
      }
    }
    
    componentDidMount = () => {
      if ( this.props.cartInfo.length === 0 ) {
        this.getFromLocalStorage();
      }else {
      this.saveInState();
      }
    }

    saveInState =  () => {
      this.setState(state => {
        const localData = state.localData.concat(this.props.cartInfo)
        this.saveInLocalStorage(localData)
        return {
          localData
        };
      })
      this.addQuantity()
    }

    addQuantity = () => {
     setTimeout( ()=> {
      if (this.state.localData.length > 0 ) {
        for (let i in this.state.localData) {
        this.setState( {quantity: this.state.localData[i].quantity = '1'})
        this.saveInLocalStorage( this.state.localData);
      }
    }
    }, 250 );
      setTimeout(() => {
        if (this.state.totalPrice.length === 0) {
          this.prices(this.state.localData)
          this.totalPricesCalculation(this.state.totalPrice)
        }
      },250)
      
     }

    changeQuantity = async(id, quantityNew) => {
      for (let i in this.state.localData) {
        if (id === this.state.localData[i].id) {
        this.setState( ({quantity: this.state.localData[i].quantity = quantityNew}));
        this.saveInLocalStorage(this.state.localData);
        }
      }
      await this.prices(this.state.localData)
      await this.totalPricesCalculation(this.state.totalPrice)
    }

    prices = (array) => {
      array.map(item => {
        const price = item.price.split(' ')[0] * Number(item.quantity)
        this.setState(state => {
          const totalPrice = state.totalPrice.concat(price)
          return {
            totalPrice
          };
        }) 
      })
    }

    totalPricesCalculation = (array) => {
      let sum = 0;
      for (let i = array.length - this.state.localData.length; i < array.length; i += 1  ) {
        sum += array[i];
        this.setState({total: sum});
      }
    }
    
  getQuantity = (e) => {
    const newQuantity = document.getElementsByClassName(e.target.className)[0].value
    const id = e.target.getAttribute('idd');
    const price = Number(e.target.getAttribute('price').split(' ')[0]);
    const totalPriceCart = price * newQuantity;
    this.changeQuantity(id, newQuantity)
  }

  totalPrice = () => {
  }

   saveInLocalStorage = (data) => {
      window.localStorage.setItem(`Cart`, JSON.stringify(data))
   }

   saveInProductStorage = (key, data) => {
      window.localStorage.setItem(`${key}`, JSON.stringify(data))
   }
   
   getFromLocalStorage = () => {
      this.setState({ localData: JSON.parse(window.localStorage.getItem(`Cart`))});
   }

   changingStatus = async (id, name) => {
    await this.setState({ dataFromProduct: JSON.parse(window.localStorage.getItem(`${name}`))});
    for (let i in this.state.dataFromProduct) {
      if (id === this.state.dataFromProduct[i].id) {
      this.setState( ({clicked: this.state.dataFromProduct[i].checked = !this.state.dataFromProduct[i].checked}));
      }
    }
    this.saveInProductStorage(name, this.state.dataFromProduct);
  }

  changeCartLength = async() => {
    await this.setState({ lengthCart: JSON.parse(window.localStorage.getItem(`LenghthOfCart`))});
    this.setState({lengthCart: this.state.lengthCart -= 1});
    window.localStorage.setItem(`LenghthOfCart`, JSON.stringify(this.state.lengthCart));
    this.props.getLengthCart(this.state.lengthCart);
   


  }

    removeFromCart = async (e) => {
      this.setState({ localData: JSON.parse(window.localStorage.getItem(`Cart`))});
      let filteredArray = this.state.localData.filter(item => item.id !== e.target.getAttribute('id'))
      this.setState({localData: filteredArray});
      this.saveInLocalStorage(filteredArray);
      this.changingStatus( e.target.getAttribute('id'), e.target.getAttribute('name') )
      this.setState({total: this.state.total - (e.target.getAttribute('price').split(' ')[0] * Number(e.target.getAttribute('quantity')))})
      this.props.deleteProps(filteredArray)
      this.changeCartLength();
    }

    render() {
      return ( 
      <main>
        <div className="basket">
          <div className="basket-labels">
            <ul>
              <li className="item item-heading">Item</li>
              <li className="price">Price</li>
              <li className="quantity">Quantity</li>
              <li className="subtotal">Subtotal</li>
            </ul>
          </div>
          {this.state.localData.map(item => <div>
            <div className="basket-product">
              <div className="item">
                <div className="product-image">
                  <img src={item.image} alt="Placholder Image 2" className="product-frame"/>
                </div>
                <div className="product-details">
                  <h1><strong><span className="item-quantity"></span>{item.name}</strong></h1>
                  <p><strong>Navy, Size 18</strong></p>
                  <p>Product Code - {item.id}</p>
                </div>
              </div>
          <div className="price">{item.price.split(' ')[0]}</div>
          <div className="quantity">
            <input type="number" onClick={this.getQuantity} price={item.price} idd={item.id} min="1"  max="99" id ="quantity-field"  className={item.id} />
          </div>
          <div className="subtotal" >{Number(item.price.split(' ')[0]) * item.quantity} </div>
          <div className="remove">
            <button  id={item.id} name={item.name} quantity={item.quantity} price={item.price} onClick={this.removeFromCart}>Remove</button>
          </div>
        </div>
        </div>
      )}
      </div>
      <aside>
        <div className="summary">
          <div className="summary-total-items"><span className="total-items"></span> Items in your Bag</div>
          <div className="summary-subtotal">
            <div className="subtotal-title">Subtotal</div>
            <div className="subtotal-value final-value" id="basket-subtotal">{ this.state.localData.length === 0 ? 0 :this.state.total }</div>
            <div className="summary-promo hide">
              <div className="promo-title">Promotion</div>
              <div className="promo-value final-value" id="basket-promo"></div>
            </div>
          </div>
          <div className="summary-total">
            <div className="total-title">Total</div>
            <div className="total-value final-value" id="basket-total">{this.state.localData.length === 0 ? 0 :this.state.total}</div>
          </div>
          <div className="summary-checkout">
          <NavLink to={"/produkter/checkout"}> 
            <button className="checkout-cta" >Checkout</button>
          </NavLink>  
          </div>
        </div>
      </aside>
    
  </main>
      )
  }
}


  