import React from 'react'
import "../static/css/Extras.css"


function Extras(props) {
    return (
        <div className="extras">
            <div className="extras-header">
                <p className="white light-heavy medium feed-zero-margin">{props.attr.header}</p>
            </div>
            <ul className="ordered-discover">
                <li className="white light-heavy small"><span><img style={{marginBottom: "5px",marginRight:"5px", marginLeft:"10px"}} src={"https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582689/TalentFlex_Static/Others/category_xdnezl.png"} /></span>{props.attr.one}</li>
                <li className="white light-heavy small"><span><img style={{marginBottom: "5px",marginRight:"5px", marginLeft:"10px"}} src={"https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582689/TalentFlex_Static/Others/category_xdnezl.png"} /></span>{props.attr.two}</li>
                <li className="white light-heavy small"><span><img style={{marginBottom: "5px",marginRight:"5px", marginLeft:"10px"}} src={"https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582689/TalentFlex_Static/Others/category_xdnezl.png"} /></span>{props.attr.three}</li>
                <li className="white light-heavy small"><span><img style={{marginBottom: "5px",marginRight:"5px", marginLeft:"10px"}} src={"https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582689/TalentFlex_Static/Others/category_xdnezl.png"} /></span>{props.attr.four}</li>
                <li className="white light-heavy small"><span><img style={{marginBottom: "5px",marginRight:"5px", marginLeft:"10px"}} src={"https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582689/TalentFlex_Static/Others/category_xdnezl.png"} /></span>{props.attr.five}</li>
            </ul>
            
        </div>
    )
}

export default Extras