import React from 'react'
import { Link } from 'react-router-dom'
import '../../static/css/Settings/SettingsBar.css'
import {useMediaQuery} from "react-responsive"

function SettingsBar(props) {
    let SubSettings = ["Profile", "Account", "Notifications", "Guidelines"]
    let SubSettingsIcons = {
        Profile: "account_circle",
        Account: "manage_accounts",
        Notifications: "notifications",
        Guidelines: "security"     
    }

    const isPhone = useMediaQuery({ query: '(min-width: 315px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' })

    return (
        <div className="settings-bar-wrap">
            {SubSettings.map(item => 
                <Link style={{textDecoration: "none"}} to={`/settings/${item}`}>
                    <div className={item == props.activeSetting ? "setting-bar setting-bar-active": "setting-bar"}>
                        <span class={isPhone && !isTablet && !isDesktop ? "material-icons white md-24" : "material-icons white md-36"}>{SubSettingsIcons[item]}</span>
                        <p style={{marginLeft: "5px"}} className="white small-medium light-heavy feed-zero-margin">{item}</p>
                    </div>
                </Link>
            )}
        </div>
    )
}

export default SettingsBar