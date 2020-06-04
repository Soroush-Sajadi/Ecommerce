import React, {Component} from "react";
import { NavLink } from 'react-router-dom';
import { Spinner } from 'react-spinners-css';

import './Category.css'

export default class Produkter extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data : []
      }
    }

    getData = () => {
      setTimeout(async() => {
      await fetch(`http://localhost:3000/`) 
        .then(response => response.json())
        .then(data => { this.setState( { data } )})
        this.saveToLocalStorage(`products-Category`,this.state.data)
        },250) 
    }

    componentDidMount = () => {
      if (JSON.parse(window.localStorage.getItem(`products-Category`)) === null) {
        console.log('im hertr')
        this.getData()
      } else {
        this.getTheLocalData(`products-Category`)
    }
  }

    saveToLocalStorage =async (key, data) => {
      await window.localStorage.setItem(`${key}`, JSON.stringify(data))
    }
  
    getTheLocalData = (name) => {
      return this.setState({ data: JSON.parse(window.localStorage.getItem(`${name}`))});
    }

    getName = (e) => {
      this.saveToLocalStorage(`produc-name`, e.target.getAttribute('name'))
      this.props.routeName(e.target.getAttribute('name'))
    }


      render() {
        return (  
          <>
          {this.state.data.length === 0 ? <div className="loading"> <Spinner color="red" size={200} /></div> : null}
            <div className="category-card-wraper">
              {this.state.data.map(item => <div className="category-card">
                <NavLink to={"/produkter/" + item.category_name}><img className="category-image" src={item.image} name={item.category_name} onClick={this.getName} /></NavLink>
                <p className="category-title">{item.category_name}</p>
              </div>
                )}
            </div>
            </>
        )
    }
}