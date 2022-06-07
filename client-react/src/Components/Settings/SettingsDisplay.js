import React from 'react'
import "../../static/css/Settings/SettingsDisplay.css"
import SettingsGuidelines from './SettingsGuidelines'
import SettingsProfile from './SettingsProfile'
import SettingsNotifications from "./SettingsNotifications"
import SettingsAccount from './SettingsAccount'

function SettingsDisplay(props) {
    let settingOptions = {
        Profile: <SettingsProfile />,
        Guidelines: <SettingsGuidelines />,
        Notifications: <SettingsNotifications />,
        Account: <SettingsAccount />
    }
    return (
        <div className="settings-display">
            {settingOptions[props.activeSetting]}
        </div>

    )
}

export default SettingsDisplay