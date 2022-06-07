import React, { useState, useEffect, useMemo, createRef } from 'react'
import "../static/css/PostComments.css"
import {getServerToken, getUserToken} from "./CommonUtls"
import Error404 from './Error404'
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProfilePopup from './ProfilePopup'
import CategoryProfile from './CategoryProfile'
import { SERVER_URL } from './CommonUtls'
import { useMediaQuery } from 'react-responsive';

var Promise = require('promise');

function PostComments(props) {
    const refs = useMemo(
        () => pretty_ref(props.attr.comments) ,
        [props.attr.post_id, props.attr.action_comment]
    );

    const isPhone = useMediaQuery({ query: '(min-width: 315px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' })
    

    useEffect(() => {
        AOS.init();
        if (props.attr.action_comment && refs[props.attr.action_comment]) {
            refs[props.attr.action_comment].current.scrollIntoView({block: "center"})
        }
      }, [props.attr.post_id, props.attr.action_comment]);

    const [commentState, setCommentState] = useState("")
    const [error404, setError404] = useState("None")
    const [profilePopup, setProfilePopup] = useState({
        active: false,
        key: ""
    })

    function pretty_ref(comment_list) {
        let new_object = {};
        comment_list.map((item) => {
            new_object[item.id] = createRef()
        })
        return new_object
    }


    function handleChange(item) {
        setCommentState(item.target.value)
    }

    function handleProfilePopup(index) {
        setProfilePopup(prevState => ({
            active: !prevState.active,
            key: index
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`${SERVER_URL}/post_a_comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req_body)
        }).then(response => response.json()).then(res => {
            if (res.status === "Online") {
                setCommentState("")
                setError404("None")
                const scrollPromise = new Promise(resolve => props.reFetchData(resolve))
            } else if (res.status === "error 404 not found") {
                setError404("Not found")
                setCommentState("")
            } else {
                setError404("Reset")
                setCommentState("")
            }
        }).catch(err => {
            setError404("Reset")
            setCommentState("")
        })
    }

    let req_body = {
        user_token: getUserToken(),
        server_token: getServerToken(),
        user_id: props.secAttr.user_id,
        post_id: props.secAttr.post_id,
        value: commentState
    }


    return (
        <div>
            {error404 !== "None" ? error404 === "Reset" ? <Error404 attr={{resetSession: true}} /> : <Error404 attr={{resetSession: false}} /> : 
            <div className="post-comments-wrap">
            <div className="post">
                <div className="post-user-creds">
                    <img style={{marginRight: "5px"}} src={"https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582689/TalentFlex_Static/Others/category_xdnezl.png"} />
                    <p className="small light-heavy white feed-zero-margin">t/{props.attr.category}</p>
                    <p style={{marginLeft: "5px", marginRight: "5px"}} className="small light-heavy white feed-zero-margin">∙</p>
                    <p className="small light-heavy light-gray feed-zero-margin">Posted by u/
                        <span style={{position: "relative"}} onClick={() => {handleProfilePopup("main")}} className="small light-heavy light-gray feed-zero-margin username-underline">
                            {props.attr.username}
                            {profilePopup.active && profilePopup.key === "main" ?
                                <ProfilePopup attr={{
                                    username: props.attr.username, 
                                    profile_image: props.thirdAttr.author_profile_image,
                                    top: "",
                                    bottom: "",
                                    left: "",
                                    right: isPhone && !isTablet && !isDesktop ? "-50px" : "",
                                }} /> : null
                            }
                        </span> on {props.attr.timePosted}.</p>
                </div>
                <p className="medium white light-heavy">{props.attr.caption}</p>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    {props.attr.type == "image" ? <img className="feed-image" src={props.attr.image} /> : <video className='feed-image' src={props.attr.image} controls muted autoPlay></video>}
                </div>
                <div className="post-comments-div">
                    <form onSubmit={handleSubmit}>
                            <div className="comment-form white light-heavy small-medium">
                                <img className="profile-image-comment" src={props.secAttr.profile_image} />
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={commentState} onChange={handleChange} placeholder="Share your thoughts..."></textarea> 
                            </div>
                            <div className="post-button-div">
                                <button type="submit" class="btn btn-success light-heavy comment-post-button">Post</button>
                            </div>
                    </form>
                    {props.attr.comments.map((item, index) =>
                        <div ref={refs[item.id]} className="comment" data-aos-once="true" data-aos="fade-down" data-aos-duration="750">
                        {profilePopup.active && profilePopup.key === index ?
                            <ProfilePopup attr={{
                                username: item.user, 
                                profile_image: item.profile_image,
                                top: "",
                                bottom: "-100%",
                                left: "50px",
                                right: "",}} /> : null
                        }
                            <img onClick={() => handleProfilePopup(index)} className="profile-image-comment" src={item.profile_image} />
                            <div className="comment-creds">
                                <p style={{marginBottom: "5px"}} className="light-heavy small-medium light-gray feed-zero-margin">u/{item.user}<span className="light-heavy small light-gray feed-zero-margin" style={{marginLeft: "5px"}}>∙ {item.date_text}</span></p>
                                <p className="light-heavy small-medium white feed-zero-margin">{item.value}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div> 
            <div className="author-profile-wrap">
                <CategoryProfile attr={props.fourthAttr} />
            </div>
        </div>
        }
        </div>
    )
}


export default PostComments