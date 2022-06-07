import React, {useEffect} from 'react'
import "../static/css/IntroText.css"
import AOS from 'aos';
import 'aos/dist/aos.css';


function IntroText(props) {
    useEffect(() => {
        AOS.init();
        document.getElementsByClassName("intro-text")[0].style.opacity = 0.8
      }, []);
    return (
        <div className="intro-text-container">
            <div className="intro-text" data-aos="fade-left" data-aos-mirror="true" data-aos-duration="2000">
                <h2 className="intro-title-style white big heavy">{props.attr.header}</h2>
                <p className="intro-text-style white medium light">{props.attr.text}</p>
            </div>
        </div>
    )
}

export default IntroText