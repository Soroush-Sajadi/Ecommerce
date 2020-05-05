import React, {Component} from "react";
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

      render() {
        return (  
            <div className="category-card-wraper">
              {this.state.data.map(item => <div className="category-card">
                <img className="category-image" src={item.image} />
                <p className="category-title">{item.category_name}</p>
              </div>
                )}
            </div>
        )
    }
}