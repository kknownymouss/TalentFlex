import React from 'react'
import "../../static/css/Settings/SettingsInterface.css"
import SettingsDisplay from './SettingsDisplay'
import SettingsBar from "./SettingsBar"


function SettingsInterface(props) {

    return (
        <div className="settings-options-wrap">
            <SettingsBar activeSetting = {props.activeSetting} />
            <SettingsDisplay activeSetting={props.activeSetting} />
        </div>
    )
}

export default SettingsInterface