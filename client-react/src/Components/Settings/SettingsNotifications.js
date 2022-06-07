import React from 'react'
import "../../static/css/Settings/SettingsNotifications.css"
import ToggleSwitch from '../ToggleSwitch'

function SettingsNotifications() {
    return (
        <div className="settings-notifications-wrap fade-in">
            <p className="white medium-big light-heavy settings-guidelines-header">Customize Notifications</p>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "30px", padding: "30px 30px 30px 30px", backgroundColor: "var(--dark-yellow)"}}>
                <span className="material-icons md-36 white" style={{marginRight: "10px"}}>notifications</span>
                <p className="white medium feed-zero-margin">Control what kind of notifications will be sent to you in the built-in notification section. Desktop notifications are not supported. (This feature is not functional yet)</p>
            </div>
            <div className="settings-notifications-options">
                <div className="settings-notifications-option">
                    <p className="notif-title-text white medium light-heavy">Allow notifications upon other users liking your posts.</p>
                    <ToggleSwitch />
                </div>
                <div className="settings-notifications-option">
                    <p className="notif-title-text white medium light-heavy">Allow notifications upon other users commenting on your posts.</p>
                    <ToggleSwitch />
                </div>
                <div className="settings-notifications-option">
                    <p className="notif-title-text white medium light-heavy">Allow notifications upon followed users uploading posts.</p>
                    <ToggleSwitch />
                </div>
                <div className="settings-notifications-option">
                    <p className="notif-title-text white medium light-heavy">Allow notifications upon other users mentioning you in the comments.</p>
                    <ToggleSwitch />
                </div>
                <div className="settings-notifications-option">
                    <p className="notif-title-text white medium light-heavy">Allow notifications upon other users sending you messages.</p>
                    <ToggleSwitch />
                </div>
            </div>
        </div>
    )
}

export default SettingsNotifications