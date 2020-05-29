import React, {Component} from "react";
import { Slide } from 'react-slideshow-image';

import image from '../Images/babynest.jpg';
import image2 from '../Images/mossor.jpg';
import image3 from '../Images/filtar.jpg';


export default class Hem extends Component {

  constructor () {
    super ();

    this.state = {
      slideImages : [
        image,
        image2,
        image3,
      ],
      properties : {
        duration: 3000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        arrows: true,
        pauseOnHover: true,
        onChange: (oldIndex, newIndex) => {
          console.log(`slide transition from ${oldIndex} to ${newIndex}`);
        }
      }
    }
  }
   
 
   
   
     render () {
      return (
        <div className="slide-container">
          <Slide {...this.state.properties}>
            <div className="each-slide">
              <div style={{'backgroundImage': `url(${this.state.slideImages[0]}) `,'height': '400px'}}>
              </div>
            </div>
            <div className="each-slide">
              <div style={{'backgroundImage': `url(${this.state.slideImages[1]})`,'height': '400px'}}>
              </div>
            </div>
            <div className="each-slide">
              <div style={{'backgroundImage': `url(${this.state.slideImages[2]})`,'height': '400px'}}>
              </div>
            </div>
          </Slide>
        </div>
      )
  }
}
