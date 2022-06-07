import React from 'react'
import "../../static/css/Upload/UploadGuidelines.css"
import {Link} from "react-router-dom"

function UploadGuidelines() {
    return (
        <div className="upload-guidelines">
            <div className="upload-guidelines-header">
                <p className="white light-heavy medium feed-zero-margin">Upload Guidelines</p>
            </div>
            <ol className="guidelines">
                <li className="small white guideline-text">The use of NSFW images/videos is strictly prohibted. TalentFlex is a community based on one's talents and abilities.</li>
                <li className="small white guideline-text">Posts must be uploaded to their respectful talent section. Don't upload stuff that tend to ruin the composition of each section.</li>
                <li className="small white guideline-text">Keep it legal, and avoid posting illegal content or soliciting or facilitating illegal or prohibited transactions.</li>
                <p className="feed-zero-margin white light-heavy small-medium">For the full list of guidelines and policies. Please check <Link className="talentflex-policies"><span>TalentFlex policies and guidelines.</span></Link></p>
            </ol> 
        </div>
    )
}

export default UploadGuidelines