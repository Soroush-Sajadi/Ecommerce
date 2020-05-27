import React, {Component} from "react";
import './Checkout.css'

export default class Omoss extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            info: [{
                name: null,
                familyName: null,
                email: null,
                address: null,
                city: null,
                postalCode: null,
                phone: null
            }],
        }
    }

    checkObjectHasData = (obj) => {
      for(let key in obj) {
        if(obj[key] ===  null)
          return false;
      }
      return true;
        
    }

    getInfo = (e) => {
      let value = e.target.value
      let key = e.target.id
      this.setState({key: this.state.info[0][key] = value})
    }

    sendDataToDb = () => {
      this.checkObjectHasData(this.state.info[0]);
    }
    render() {
      return (  
      <>
        <h1>Elegant Contact Form</h1>
        <form className="cf">
          <div className="half left cf">
            <input type="text" id="name" onChange={this.getInfo} placeholder="Namn"/>
            <input type="text" id="familyName" onChange={this.getInfo} placeholder="Efter Namn"/>
            <input type="email" id="email" onChange={this.getInfo} placeholder="Email address" />
            <input type="email" id="email2" onChange={this.getInfo} placeholder="Repeat Email address" />
            <input type="email" id="address" onChange={this.getInfo} placeholder="Address" />
            <input type="email" id="city" onChange={this.getInfo} placeholder="City" />
            <input type="email" id="postalCode" onChange={this.getInfo} placeholder="Postal Code" />
            <input type="text" id="phone" onChange={this.getInfo} placeholder="tele-phone" />
          </div>
          <input type="submit" value="Submit" id="input-submit" onClick={this.sendDataToDb}/>
        </form>
      </>
      )
    }
}