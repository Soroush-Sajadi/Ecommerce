import React, {Component} from "react";
import { NavLink } from 'react-router-dom';
import './Cart.css'

export default class Produkter extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dataFromProduct : [],
        localData: [],
        totalPrice: []

      }
    }
    
    componentDidMount = () => {
      if ( this.props.cartInfo.length === 0 ) {
        this.getFromLocalStorage();
      } 
      this.saveInState();
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
        this.setState( {quantity: this.state.localData[i].quantity = 1})
      }
    }
  }, 250 )
     }

    changeQuantity = (id, quantityNew) => {
      for (let i in this.state.localData) {
        if (id === this.state.localData[i].id) {
        this.setState( ({quantity: this.state.localData[i].quantity = quantityNew}));
        }
      }
    }
    
    getQuantity = (e) => {
      const newQuantity = document.getElementsByClassName(e.target.className)[0].value
      const id = e.target.getAttribute('idd');
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

    removeFromCart = (e) => {
      this.setState({ localData: JSON.parse(window.localStorage.getItem(`Cart`))});
      let filteredArray = this.state.localData.filter(item => item.id !== e.target.getAttribute('id'))
      this.setState({localData: filteredArray});
      this.saveInLocalStorage(filteredArray);
      this.changingStatus( e.target.getAttribute('id'), e.target.getAttribute('name') )
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
          <div className="price">{item.price}</div>
          <div className="quantity">
            <input type="number" onClick={this.getQuantity} price={item.price} idd={item.id} min="1"  max="99" id ="quantity-field"  className={item.id} />
          </div>
          <div className="subtotal" >{Number(item.price.split(' ')[0]) * item.quantity}</div>
          <div className="remove">
            <button  id={item.id} name={item.name} onClick={this.removeFromCart}>Remove</button>
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
            <div className="subtotal-value final-value" id="basket-subtotal">130.00</div>
            <div className="summary-promo hide">
              <div className="promo-title">Promotion</div>
              <div className="promo-value final-value" id="basket-promo"></div>
            </div>
          </div>
          <div className="summary-delivery">
            <select name="delivery-collection" className="summary-delivery-selection">
                <option value="0" selected="selected">Select Collection or Delivery</option>
              <option value="collection">Collection</option>
              <option value="first-className">Royal Mail 1st className</option>
              <option value="second-className">Royal Mail 2nd className</option>
              <option value="signed-for">Royal Mail Special Delivery</option>
            </select>
          </div>
          <div className="summary-total">
            <div className="total-title">Total</div>
            <div className="total-value final-value" id="basket-total">130.00</div>
          </div>
          <div className="summary-checkout">
            <button className="checkout-cta">Go to Secure Checkout</button>
          </div>
        </div>
      </aside>
      
  </main>
        
      )
  }
}


  