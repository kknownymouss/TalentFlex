import React, {useEffect} from "react"
import "../static/css/ContactSection.css"
import AOS from 'aos';
import 'aos/dist/aos.css';

function ContactSection(props) {
    useEffect(() => {
        AOS.init();
      }, []);
    return (
        <div className="contact-div-wrap-2-column" data-aos="fade-up" data-aos-duration="500" data-aos-mirror="false">
            <div className="contact-div">
                <div className="contact">
                    <img className="contact-img" src={props.attr.img1} />
                    <h2 className="contact-text light-heavy big black">{props.attr.text1}</h2>
                </div>
                <div className="contact">
                    <img className="contact-img" src={props.attr.img2} />
                    <h2 className="contact-text light-heavy big black">{props.attr.text2}</h2>
                </div>
                <div className="contact">
                    <img className="contact-img" src={props.attr.img3} />
                    <h2 className="contact-text light-heavy big black">{props.attr.text3}</h2>
                </div>
            </div>
            <div className="contact-div">
            <div className="contact">
                <img className="contact-img" src={props.attr.img4} />
                <h2 className="contact-text light-heavy big black">{props.attr.text4}</h2>
            </div>
            <div className="contact">
                <img className="contact-img" src={props.attr.img5} />
                <h2 className="contact-text light-heavy big black">{props.attr.text5}</h2>
            </div>
            <div className="contact">
                <img className="contact-img" src={props.attr.img6} />
                <h2 className="contact-text light-heavy big black">{props.attr.text6}</h2>
            </div>
        </div>
        </div>
    )
}

export default ContactSection