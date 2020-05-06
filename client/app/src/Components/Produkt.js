import React, {Component} from "react";

export default class Produkt extends Component {
    
      render() {
        return (  
            <div>
              <h1>Här är {this.props.produktName}</h1>
            </div>
        )
    }
}