import React, {useEffect} from 'react'
import "../static/css/Quote.css"
import AOS from 'aos';
import 'aos/dist/aos.css';

function Quote(props) {
    useEffect(() => {
        AOS.init();
      }, []);
    return (
        <div className="quote-div" data-aos="fade-up" data-aos-duration="500" data-aos-mirror="false">
            <p className="quote heavy">{props.attr.text}</p>
        </div>
    )
}


export default Quote