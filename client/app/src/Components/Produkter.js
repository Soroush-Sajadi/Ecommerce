import React, {Component} from "react";

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
            <div>
              <h1>Kolla vad vi har!</h1>
              {this.state.data.map(item => <div>
                <img src={item.image} />
                <p>{item.category_name}</p>
              </div>
                )}
            </div>
        )
    }
}