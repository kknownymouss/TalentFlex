import React, {useEffect} from 'react'
import "../static/css/RightTalent.css"
import AOS from 'aos';
import 'aos/dist/aos.css';

function RightTalent(props) {
    useEffect(() => {
        AOS.init();
      }, []);
    return (
        <div style={{backgroundImage: `url(${props.attr.bg})`}} className="right-talent" data-aos="fade-up" data-aos-duration="500" data-aos-mirror="false">
            <div className="right-talent-desc">
                <h2 className="right-talent-desc-title heavy white big">{props.attr.title}</h2>
                <p className="right-talent-desc-text medium light-heavy white">{props.attr.text}</p>
                <button type="button" class="btn btn-outline-light right-learn-more light-heavy medium white">{props.attr.word}</button>
            </div>
            {props.attr.video ? 
                <div className="right-video-mask">
                    <video className="video-res" src={props.attr.video} autoPlay loop muted/>
                </div> :
                <img className="right-image" src={props.attr.image} /> 
            }
            
        </div>
    )
}

export default RightTalent