import React, {useState, useEffect} from "react";
import "../../static/css/Upload/UploadSubmitStep.css"
import LightError404 from "../LightError404";
import {Link} from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css'
import { SERVER_URL } from '../CommonUtls'

function UploadSubmitStep(props) {
    useEffect(() => {
        AOS.init();
      }, []);
    const [error404, setError404] = useState("None")
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [redirectState, setRedirectState] = useState({})


    function handleSubmit(e) {
        setLoading(true)
        e.preventDefault()
        let post_info = new FormData()
        for (let i in props.attr) {
            post_info.append(i, props.attr[i])
        }
        fetch(`${SERVER_URL}/upload_a_post`, {
        method: "POST",
        body: post_info
        }).then(response => response.json()).then(res => {
            if (res.status === "Online") {
                setError404("None")
                setRedirectState({
                    category: res.talent,
                    post_id: res.post_id
                })
                setSubmitted(true)
                setLoading(false)
            } else if (res.status === "error 404 not found") {
                setError404("Not found")
                setLoading(false)
                setSubmitted(false)
                setRedirectState({})
            } else {
                setError404("Reset")
                setLoading(false)
                setSubmitted(false)
                setRedirectState({})
            }
        }).catch(err => {
            setError404("Reset")
            setLoading(false)
            setSubmitted(false)
            setRedirectState({})
        })
    }

    return (
        <div>
        {error404 !== "None" ? error404 === "Reset" ? <LightError404 attr={{resetSession: true}} /> : <LightError404 attr={{resetSession: false}} /> : null } 
        {error404 !== "None" ? null : !loading ?  !submitted ? <div className="submit-post-wrap"  data-aos="fade-down" data-aos-duration="750"> 
            <p className="feed-zero-margin light-heavy medium-big final-upload-text">Your talent is ready to be admired. Share it with the world.</p>
            <button onClick={handleSubmit} className="btn btn-success light-heavy medium success-upload-button">Submit Post</button>
        </div> 
        : 
        <div className="submit-post-wrap"  data-aos="fade-down" data-aos-duration="750"> 
            <p className="feed-zero-margin light-heavy medium-big final-upload-text">Submitted Successfully.</p>
            <Link to={`/feed/${redirectState.category}/${redirectState.post_id}`}>
                <button className="btn btn-success light-heavy medium success-upload-button">Check Post</button>
            </Link>
        </div>
        : 
        <div className="submit-post-wrap"  data-aos="fade-down" data-aos-duration="750"> 
            <p className="feed-zero-margin light-heavy medium-big final-upload-text">Your talent is ready to be admired. Share it with the world.</p>
            <button style={{width: "100px"}} className="btn btn-success light-heavy medium success-upload-button">
                <span style={{marginTop: "6px", height: "1.2rem", width: "1.2rem"}} class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span class="sr-only"></span>
            </button>
        </div>
    }
        </div>
    )
}

export default UploadSubmitStep