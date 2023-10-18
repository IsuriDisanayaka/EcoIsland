import React from 'react'
import { Slide } from 'react-slideshow-image'
import one from "../assets/img/1.png";
import two from "../assets/img/2.jpeg";
import three from "../assets/img/3.jpg";
import four from "../assets/img/4.png";
import five from "../assets/img/5.png";
import six from "../assets/img/6.png";
import seven from "../assets/img/7.jpg";

import './Slideshow.css'
import 'react-slideshow-image/dist/styles.css';



const proprietes = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true
}

const Slideshow = () => {
    return (
        <div className="containerSlide">


            <Slide {...proprietes}>

                <div className="each-slide">
                    <div>
                        <img src={one} alt="img1" />
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                        <img src={two} alt="img2" />
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                        <img src={three} alt="img3" />
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                        <img src={four} alt="img4" />
                    </div>
                </div>

                <div className="each-slide">
                    <div>
                        <img src={five} alt="img5" />
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                        <img src={six} alt="img6" />
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                        <img src={seven} alt="img7" />
                    </div>
                </div>

            </Slide>

        </div>
    )
}

export default Slideshow;