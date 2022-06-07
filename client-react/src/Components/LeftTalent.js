import React, {useEffect} from 'react'
import "../static/css/LeftTalent.css"
import AOS from 'aos';
import 'aos/dist/aos.css';

function LeftTalent(props) {
    useEffect(() => {
        AOS.init();
      }, []);
    return (
        <div style={{backgroundImage: `url(${props.attr.bg})`}} className="left-talent" data-aos="fade-right" data-aos-duration="500" data-aos-mirror="false">
            {props.attr.video ? 
                <div className="left-video-mask">
                    <video className="video-res" src={props.attr.video} autoPlay loop muted />
                </div> :
                <img className="left-image" src={props.attr.image} /> 
            }
            <div className="left-talent-desc">
                <h2 className="left-talent-desc-title heavy black big">{props.attr.title}</h2>
                <p className="left-talent-desc-text medium light-heavy black">{props.attr.text}</p>
                <button type="button" class="btn btn-outline-dark left-learn-more medium light-heavy black">{props.attr.word}</button>
            </div>
        </div>
    )
}

export default LeftTalent