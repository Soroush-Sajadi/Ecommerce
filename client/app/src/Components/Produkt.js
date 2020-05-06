import React, {Component} from "react";

export default class Produkt extends Component {
  constructor() {
    super()
    this.state = {
      data : []
    }
  };

  getData = () => {
    await fetch(`http://localhost:3000/products/${this.props.produktName}`) 
      .then(response => response.json())
      .then(data => { this.setState( { data } )
      })
  };

  componentDidMount = () => {
    this.getData()
  }
    
  render() {
    return (  
        <div>
          <h1>Här är {this.state.product_name}</h1>
        </div>
    )
}
}