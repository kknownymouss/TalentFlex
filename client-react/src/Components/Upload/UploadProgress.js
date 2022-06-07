import React from 'react'
import "../../static/css/Upload/UploadProgress.css"

function UploadProgress(props) {
    return (
        <div className="progress-steps">
            <div className="progress-main-wrap">
                <div className={props.attr.stepCounter >= 1 ? "progress-number-wrap-active" : "progress-number-wrap"}>
                    <p className={props.attr.stepCounter >= 1 ? "light-heavy medium-big progress-number-active" : "light-heavy medium-big progress-number"}>1</p>
                </div>
                <p className={props.attr.stepCounter >= 1 ? "medium feed-zero-margin progress-word-active" : "medium feed-zero-margin progress-word"}>Upload File</p>
            </div>
            <div className={props.attr.stepCounter >= 1 ? "dummy-line-active" : "dummy-line"}></div>
            <div className="progress-main-wrap">
                <div className={props.attr.stepCounter >= 2 ? "progress-number-wrap-active" : "progress-number-wrap"}>
                    <p className={props.attr.stepCounter >= 2 ? "light-heavy medium-big progress-number-active" : "light-heavy medium-big progress-number"}>2</p>
                </div>
                <p className={props.attr.stepCounter >= 2 ? "medium feed-zero-margin progress-word-active" : "medium feed-zero-margin progress-word"}>Add Info</p>
            </div>
            <div className={props.attr.stepCounter >= 2 ? "dummy-line-active" : "dummy-line"}></div>
            <div className="progress-main-wrap">
                <div className={props.attr.stepCounter >= 3 ? "progress-number-wrap-active" : "progress-number-wrap"}>
                    <p className={props.attr.stepCounter >= 3 ? "light-heavy medium-big progress-number-active" : "light-heavy medium-big progress-number"}>3</p>
                </div>
                <p className={props.attr.stepCounter >= 3 ? "medium feed-zero-margin progress-word-active" : "medium feed-zero-margin progress-word"}>Review</p>
            </div>
        </div>
    )
}

export default UploadProgress