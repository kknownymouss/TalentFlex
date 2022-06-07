import React from 'react'
import Features from "./Features"
import LandingEnding from './LandingEnding'
import PagePreview from './PagePreview'
import Quote from './Quote'
import TalentTypes from './TalentTypes'


function HomeLanding({ match }) {
    return (
        <div>
            <PagePreview attr={{
                header: "Share your talent with the world.",
                text: "TalentFlex is a great website used for sharing one's interests and talents.\
                Sign in, create an account, post any type of project you've been working on\
                and get honest opinions and ratings from other users on the web.\
                Bond with other people, create friendships , take a look at their work\
                and hobbies. Gain new ideas, methods, tips and tricks that might help\
                improve your skills and knowledge.",
                activeLink: "Home"
            }} />
            <Features attr={{
                title1: "Meet New People",
                text1: "Meet new people from all around the globe. Talents from different countries, cultures and origins all grouped up in one warming place filled with love !",
                img1: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582696/TalentFlex_Static/Others/groups1_vvztbm.png",
                title2: "Impress The World",
                text2: "Share your extraordinary work with the world. Recieve tons of love and support as you flex these talents of yours. We are called TalentFlex for a reason ! ",
                img2: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582710/TalentFlex_Static/Others/trending_up1_z0n2ou.png",
                title3: "Simple To Use",
                text3: "Providing an easy-to-use simple interface that suits all users. Choose a photo that represents your talent, upload it and that's it. Your talent is ready to be admired !",
                img3: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582723/TalentFlex_Static/Others/simple_use1_d0nvdp.png"
            }} />
            <TalentTypes />
            <Quote attr={{
                text: "“Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.”\
                ― Roy T. Bennett, The Light in the Heart"
            }}/>
            <LandingEnding />
        </div>
    )
}

export default HomeLanding