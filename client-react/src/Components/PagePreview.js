import React from 'react'
import Navbar from './Navbar'
import IntroText from './IntroText'
import "../static/css/PagePreview.css"

function PagePreview(props) {
    return (
        <header>
            <div className="page-preview" style={{backgroundImage: `url(https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582732/TalentFlex_Static/Others/simple_bg2_o1p0vk.png)`}}>
                <Navbar attr = {{
                    activeLink:props.attr.activeLink
                }} />
                <IntroText attr = {{
                    header: props.attr.header,
                    text: props.attr.text
                }} />
            </div>
        </header>
    )
}


export default PagePreview