import React, {Component} from "react";
import { NavLink } from 'react-router-dom';
import './Cart.css'

export default class Produkter extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dataFromProduct : [],
        localData: [],

      }
    }
    
    componentDidMount = () => {
      if ( this.props.cartInfo.length === 0 ) {
        console.log('from storage');
        this.getFromLocalStorage();
      } else {
        console.log('from props ')
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
        console.log('her---')
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
      this.props.deleteProps([]);
      //console.log(e.target.getAttribute('id'), e.target.getAttribute('name'))
      this.changingStatus( e.target.getAttribute('id'), e.target.getAttribute('name') )
    }
    render() {
      return ( 
        <div className="wraper">
        {this.state.localData?.map(item => 
          <div className="cart">
            <img src={item.image} />
          <ul className="cart-wraper">
            <li className="li-title">{item.name}</li>
            <li className="li-info">{item.color}</li>
            <li className="li-desc">{item.description}</li>
          </ul>
            <input type="submit" value="Ta bort" id={item.id} name={item.name} onClick={this.removeFromCart} />
          </div>
          )} 
          {this.props.cartInfo.length !== 0 ? (<NavLink to={"/produkter/"+ this.props.cartInfo[ (this.props.cartInfo.length) - 1 ].name }> tillbacks</NavLink>):null}
        </div>  
      )
  }
}