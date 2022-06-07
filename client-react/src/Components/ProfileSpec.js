import React from "react"
import "../static/css/ProfileSpec.css"

function ProfileSpec(props) {
    function isNumeric(value) {
        return /^\d+$/.test(value);
    }

    let x
    if (isNumeric(props.attr.text)) {
        x = `profile-more-status-Age small light-heavy`
    }else if (props.attr.text !== "Music Production") {
        x = `profile-more-status-${props.attr.text} small light-heavy`
    } else {
        let cls = props.attr.text.split(" ")
        x = `profile-more-status-${cls[0]}-${cls[1]} small light-heavy`
    }
    return (
        <p className={x}>{props.attr.text}</p>
    )
}

export default ProfileSpec