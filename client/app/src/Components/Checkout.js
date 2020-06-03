import React, {Component} from "react";
import { NavLink, Redirect } from 'react-router-dom';
import './Checkout.css'

export default class Omoss extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            info: [{
                name: null,
                familyName: null,
                email: null,
                email2: null,
                address: null,
                city: null,
                postalCode: null,
                phone: null
            }],
            products: [],
            savedInDb: false,
            emaiError: false,
            itsEmpty: false,
            path: '',
            id: null,
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

    fetchData = async(products, information) => {
      await fetch (`http://localhost:3000/products/orderd`, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "products":products,
          "information": information
        })
      })
      .then(res => res.json())
      .then(id => this.setState({ id }))
    }

    sendDataToDb = async () => {
      if(this.checkObjectHasData(this.state.info[0])) {
        this.setState({itsEmpty: false});
        if (this.state.info[0].email === this.state.info[0].email2) {
          this.setState({emaiError: false})
          await this.fetchData(JSON.parse(window.localStorage.getItem(`Cart`)),this.state.info);
          await this.setState({path: `/produkter/confirmation/${this.state.id}`});
          await this.props.getId(this.state.id);
          this.setState({savedInDb: true});
          this.props.buyerName(this.state.info[0].name)
        } else {
          this.setState({emaiError: true});
        }
      } else {
        this.setState({emaiError: false});
        this.setState({itsEmpty: true});
      }
    }

    render() {
      console.log()
      return (
      <>
        <h1>Elegant Contact Form</h1>
        <form className="cf">
          <div className="half left cf">
            {this.state.emaiError === true ? <h3>Emails are not the same</h3>: null}
            {this.state.itsEmpty === true ? <h3>Fill all the blanks</h3>: null}
            <input type="text" id="name" onChange={this.getInfo} placeholder="Namn"/>
            <input type="text" id="familyName" onChange={this.getInfo} placeholder="Efter Namn"/>
            <input type="email" id="email" onChange={this.getInfo} placeholder="Email address" />
            <input type="email" id="email2" onChange={this.getInfo} placeholder="Repeat Email address" />
            <input type="email" id="address" onChange={this.getInfo} placeholder="Address" />
            <input type="email" id="city" onChange={this.getInfo} placeholder="City" />
            <input type="email" id="postalCode" onChange={this.getInfo} placeholder="Postal Code" />
            <input type="text" id="phone" onChange={this.getInfo} placeholder="tele-phone" />
          </div>
            {this.state.savedInDb === true ?  <Redirect to={this.state.path}>
              </Redirect>: null}
            <input type="submit" value="Submit" id="input-submit" onClick={this.sendDataToDb} />
        </form>
      </>
      )
    }
}