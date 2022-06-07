import React from 'react'
import { useEffect } from 'react'
import FeaturesCard from './FeaturesCard'
import "../static/css/Features.css"
import AOS from 'aos';
import 'aos/dist/aos.css';


function Features(props) {
    useEffect(() => {
        AOS.init();
      }, []);
    return (
        <div style={{backgroundImage: `url(https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582710/TalentFlex_Static/Others/brush-bg_sfd3mt.png)`}} className="features" data-aos="fade-up" data-aos-mirror="false" data-aos-duration="1000">
            <FeaturesCard attr={{
                bg: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582725/TalentFlex_Static/Others/grey-bg_nrwgmc.jpg",
                img: props.attr.img1,  
                title: props.attr.title1,
                text: props.attr.text1,
            }}/>
            {props.attr.title2 ? <FeaturesCard attr={{
                bg: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582725/TalentFlex_Static/Others/grey-bg_nrwgmc.jpg",
                img: props.attr.img2,  
                title: props.attr.title2,
                text: props.attr.text2
            }}/> : null}
            {props.attr.title3 ? <FeaturesCard attr={{
                bg: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582725/TalentFlex_Static/Others/grey-bg_nrwgmc.jpg",
                img: props.attr.img3,  
                title: props.attr.title3,
                text: props.attr.text3
            }}/> : null}
        </div>
    )
}


export default Features