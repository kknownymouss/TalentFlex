import React, {useEffect} from 'react'
import "../../static/css/Upload/UploadReviewStep.css"
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useMediaQuery} from "react-responsive"

function UploadReviewStep(props) {
    useEffect(() => {
        AOS.init();
      }, []);
    function moveOn() {
        props.increaseCounter()
    }

    function moveBack() {
        props.decreaseCounter()
    }

    // Media Queries
    const isPhone = useMediaQuery({ query: '(min-width: 315px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' })

    return (
        <div className="review-post-wrap" data-aos="fade-down" data-aos-duration="750">
            <div className="review-row-wrap">
                <p className="light-heavy light-gray feed-zero-margin medium" style={{minWidth: isPhone && !isTablet && !isDesktop ? "100px" : "170px"}}>Selected Talent : </p>  
                <p className="review-chosen white light-heavy feed-zero-margin medium">{props.attr.talent}</p>    
            </div>
            <div className="review-row-wrap">
                <p className="light-heavy light-gray feed-zero-margin medium" style={{minWidth: isPhone && !isTablet && !isDesktop ? "100px" : "170px"}}>Selected Caption : </p>  
                <p style={{wordBreak: "break-all"}} className="review-chosen white light-heavy feed-zero-margin medium">{props.attr.caption}</p>    
            </div>
            <div className="review-row-wrap">
                <p className="light-heavy light-gray feed-zero-margin medium" style={{minWidth: isPhone && !isTablet && !isDesktop ? "100px" : "170px"}}>Selected Media : </p>  
                <img className="review-img review-chosen" src={window.URL.createObjectURL(props.attr.imgSrc)} />
            </div>
            <div className="next-but-wrap-div">
                <button onClick={moveBack} type="button" class="btn btn-danger light-heavy medium back-upload-button">Back</button>
                <button onClick={moveOn} className="btn btn-success light-heavy medium success-upload-button">Next</button>
            </div>
            
        </div>
    )
}

export default UploadReviewStep