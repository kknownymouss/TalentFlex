import React from 'react'
import ContactSection from './ContactSection'
import LandingEnding from './LandingEnding'
import PagePreview from './PagePreview'


function ContactLanding() {
    return (
        <div>
            <PagePreview attr = {{
                header: "Knownymous.",
                text: "A x years old who likes coding and creating. Self taught all thanks to google and all the youtube tutorials out there. Always eager to learn and try new ideas.",
                activeLink: "Contact"
            }}/>
            <ContactSection attr={{
                img1: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582470/TalentFlex_Static/Contact_Logos/email_jobz8i.png",
                text1: "TalentFlex@gmail.com",
                img2: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582470/TalentFlex_Static/Contact_Logos/phone_w0sklb.png",
                text2: "+000 000 000 000",
                img3: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582470/TalentFlex_Static/Contact_Logos/location_t6ok7l.png",
                text3: "i dont know.",
                img4: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582471/TalentFlex_Static/Contact_Logos/instagram_usif6p.png",
                text4: "@TalentFlex",
                img5: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582471/TalentFlex_Static/Contact_Logos/snapchat_xtmjzj.png",
                text5: "talentflexy",
                img6: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582470/TalentFlex_Static/Contact_Logos/discord_pffdb7.png",
                text6: "knownymous#9032"


            }} />
            <LandingEnding />
        </div>
    )
}

export default ContactLanding