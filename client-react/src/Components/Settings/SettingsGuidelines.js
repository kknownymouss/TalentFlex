import React from 'react'
import "../../static/css/Settings/SettingsGuidelines.css"

function SettingsGuidelines() {
    return(
        <div className="settings-guidelines-wrap fade-in">  
            <p className="white medium-big light-heavy settings-guidelines-header">Guidelines and Policies</p>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "30px", padding: "30px 30px 30px 30px", backgroundColor: "var(--dark-yellow)"}}>
                <span className="material-icons white md-36" style={{marginRight: "10px"}}>report</span>
                <p className="white medium feed-zero-margin">Please make sure to abide by these guidelines and policies as failing to do so may result in temporary or permanent bans. The rules are as following:</p>
            </div>
            <div style={{padding: "0px 30px 10px 20px"}} className="guidelines">
                <p className="light-heavy white medium">Rule 1</p>
                <p style={{marginBottom: "2em"}} className="small-medium white guideline-text">The use of NSFW images/videos is strictly prohibted. TalentFlex is a community based on one's talents and abilities.</p>
                <p className="light-heavy white medium">Rule 2</p>
                <p style={{marginBottom: "2em"}} className="small-medium white guideline-text">Posts must be uploaded to their respectful talent section. Don't upload stuff that tend to ruin the composition of each section.</p>
                <p className="light-heavy white medium">Rule 3</p>
                <p style={{marginBottom: "2em"}} className="small-medium white guideline-text">Keep it legal, and avoid posting illegal content or soliciting or facilitating illegal or prohibited transactions.</p>
                <p className="light-heavy white medium">Rule 4</p>
                <p style={{marginBottom: "2em"}} className="small-medium white guideline-text">You don’t have to use your real name to use TalentFlex, but don’t impersonate an individual or an entity in a misleading or deceptive manner.</p>
                <p className="light-heavy white medium">Rule 5</p>
                <p style={{marginBottom: "2em"}} className="small-medium white guideline-text">Don’t break the site or do anything that interferes with normal use of TalentFlex.</p>
                <p className="light-heavy white medium">Rule 6</p>
                <p className="small-medium white guideline-text">Abide by community rules. Post authentic content into communities where you have a personal interest, and do not cheat or engage in content manipulation (including spamming, vote manipulation, ban evasion, or subscriber fraud).</p>
            </div> 
        </div>
    )
}

export default SettingsGuidelines