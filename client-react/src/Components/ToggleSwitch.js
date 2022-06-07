import React from 'react'
import "../static/css/ToggleSwitch.css"

function ToggleSwitch() {
    return (
        <label class="switch">
            <input type="checkbox"/>
            <span class="slider round"></span>
        </label>
        
    )
}

export default ToggleSwitch