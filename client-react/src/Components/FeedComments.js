import React, { useEffect, useState } from 'react'
import "../static/css/FeedComments.css"
import {getServerToken, getUserToken, getTheme} from "./CommonUtls"
import FeedNavbar from './FeedNavbar'
import Error404 from './Error404'
import PostComments from './PostComments'
import ProfileSpec from './ProfileSpec'
import { SERVER_URL } from './CommonUtls'


function FeedComments(props) {
    const postID = props.match.params.postID
    const categoryName = props.match.params.category
    const [postState, setPostState] = useState([])
    const [navbarState, setNavbarState] = useState({})
    const [authorProfileState, setAuthorProfileState] = useState({})
    const [categoryProfileState, setCategoryProfileState] = useState({})
    const [clientPostCommentState, setClientPostCommentState] = useState({})
    const [error404, setError404] = useState("None")
    let req_body = {
        user_token: getUserToken(),
        server_token: getServerToken(),
        post_id: postID,
    }

    function fetchData(resolve) {
        fetch(`${SERVER_URL}/post_comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req_body)
        }).then(response => response.json()).then(res => {
            if (res.status === "Online") {
                setNavbarState(prevState => ({
                    ...res,
                    category: categoryName
                }));
                setAuthorProfileState(res.author_profile)
                setCategoryProfileState(res.category_profile)
                setPostState(res.post)
                setClientPostCommentState({
                    profile_image: res.profile_image,
                    user_id: res.userID,
                    post_id: postID
                })
                setError404("None")
                resolve()
            } else if (res.status === "error 404 not found") {
                setError404("Not found")
                setNavbarState({})
                setPostState([])
                setClientPostCommentState({})
            } else {
                setError404("Reset")
                setNavbarState({})
                setPostState([])
                setClientPostCommentState({})
            }
            }).catch(err => {
            setError404("Reset")
            setNavbarState({})
            setPostState([])
            setClientPostCommentState({})
        })
    }

    useEffect(() => 
        fetchData(() => {})   
    , [postID])
    return (
        <div>
            {error404 !== "None" ? error404 === "Reset" ? <Error404 attr={{resetSession: true}} /> : <Error404 attr={{resetSession: false}} /> : null}
            {Object.keys(navbarState).length > 0 ? 
                <>
                    <FeedNavbar attr={navbarState}/>
                    <div className={getTheme()}>
                        {postState.length > 0 && Object.keys(clientPostCommentState).length > 0  ? postState.map(item => <PostComments attr={{
                            post_id: item.post_id,
                            image: item.media,
                            caption: item.caption,
                            username: item.user,
                            category: item.category,
                            timePosted: item.date_text,
                            type: item.type,
                            comments: item.comments,
                            action_comment: props.location.action_comment
                        }} secAttr={clientPostCommentState} thirdAttr={authorProfileState} fourthAttr={categoryProfileState} reFetchData={fetchData} />) : null}
                    </div>
                </> : null
            }
        </div>
    )
}


export default FeedComments