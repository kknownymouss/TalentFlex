import React, {useEffect} from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../static/css/TalentTypes.css"
import LeftTalent from './LeftTalent'
import RightTalent from './RightTalent'
 

function TalentTypes() {
    useEffect(() => {
        AOS.init();
      }, []);
    return (
        <div className="talent-types">
            <h1 className="discover-header heavy large white" data-aos="fade-up" duration="500" data-aos-mirror="false">Discover New...</h1>
            <LeftTalent attr= {{
                bg: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582725/TalentFlex_Static/Others/grey-bg_nrwgmc.jpg",
                video: "https://res.cloudinary.com/dhcl5t8to/video/upload/v1641848196/TalentFlex_Static/Others/new_trim_t4ipsd.mp4",
                title: "Phenomenal Gaming Talents.",
                text: "Show the world those intense gaming skills of yours. Upload a GIF or a small video of your favorite gaming clutches and clips.",
                word: "Gaming"
            }} />
            <RightTalent attr= {{
                bg: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582695/TalentFlex_Static/Others/dark-grey-bg_bglt8z.png",
                image: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582710/TalentFlex_Static/Others/image-editing_wnvt1z.png",
                title: "Outstanding Editing Skills.",
                text: "Impress people with your photo and video editing skills, as well as filmmaking. Show the process or the final product.",
                word: "Editing"
            }} />
            <LeftTalent attr= {{
                bg: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582725/TalentFlex_Static/Others/grey-bg_nrwgmc.jpg",
                image: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582704/TalentFlex_Static/Others/music-produc_jnf3pt.jpg",
                title: "Sensational Music and Beats.",
                text: "Take your music and beat production to another level. Share snippets of your music or some of the production stages.",
                word: "Music"
            }} />
            <RightTalent attr= {{
                bg: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582695/TalentFlex_Static/Others/dark-grey-bg_bglt8z.png",
                image: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582694/TalentFlex_Static/Others/drawing-image_kvtawr.jpg",
                title: "Real World Talents.",
                text: "Share a variety of other real life talents like drawing, singing, digital developing, building, creating and many more. ",
                word: "Drawing"
            }} />
        </div>
    )
}

export default TalentTypes