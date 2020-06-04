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
        .then(data => { this.setState( { data } )
          })
        },250) 
    }

    componentDidMount = () => {
      this.getData()
    }

    getName = (e) => {
      this.props.routeName(e.target.getAttribute('attr'))
    }


      render() {
        return (  
          <>
          {this.state.data.length === 0 ? <div className="loading"> <Spinner color="red" size={200} /></div> : null}
            <div className="category-card-wraper">
              {this.state.data.map(item => <div className="category-card">
                <NavLink to={"/produkter/" + item.category_name}><img className="category-image" src={item.image} attr={item.category_name} onClick={this.getName} /></NavLink>
                <p className="category-title">{item.category_name}</p>
              </div>
                )}
            </div>
            </>
        )
    }
}