import React, {useEffect} from 'react'
import "../static/css/LightError404.css"
import {removeUserSession} from "./CommonUtls"

function LightError404(props) {
    useEffect(() => {
        if (props.attr.resetSession) { 
            removeUserSession() 
        }
    }, [])
    return (
        <p data-aos="fade-down" data-aos-duration="750" className="error-submit-text light-heavy medium-big">Something went wrong. Please try again.</p>
    )
}

export default LightError404