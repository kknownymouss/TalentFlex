import React, {useEffect, useState} from "react"
import FeedNavbar from "./FeedNavbar"
import Error404 from "./Error404"
import { getUserToken, getServerToken, getTheme } from "./CommonUtls"
import FeedPosts from "./FeedPosts"
import { SERVER_URL } from './CommonUtls'

function UserInfo({ match }) {
    const userUsername = match["params"]["userUsername"]
    const [postState, setPostState] = useState([])
    const [navbarState, setNavbarState] = useState({})
    const [error404, setError404] = useState("None")
    const [authorProfileState, setAuthorProfileState] = useState({})
    const [sort, setSort] = useState("New")
    
    function handleSort(sortType) {
        setSort(sortType)
    }

    let req_body = {
        user_token: getUserToken(),
        server_token: getServerToken(),
        user_username: userUsername,
        sort: sort
    }

    function fetchData() {
        fetch(`${SERVER_URL}/get_user_profile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req_body)
        }).then(response => response.json()).then(res => {
            if (res.status === "Online" || res.status === "Offline") {
                setNavbarState(prevState => ({
                    ...res,
                    category: userUsername
                }))
                setPostState(res.posts)
                setAuthorProfileState(res.author_profile)
                setError404("None")
            } else if (res.status === "error 404 not found") {
                setError404("Not found")
                setNavbarState({})
                setPostState([])
            } else {
                setError404("Reset")
                setNavbarState({})
                setPostState([])
            }
            }).catch(err => {
            setError404("Reset")
            setNavbarState({})
            setPostState([])
        })
    }
    useEffect(() => {
        fetchData()
    }, [userUsername, sort])
    return (
        <div>
            {error404 !== "None" ? error404 === "Reset" ? <Error404 attr={{resetSession: true}} /> : <Error404 attr={{resetSession: false}} /> : null}
            {Object.keys(navbarState).length > 0 ? 
                <>
                    <FeedNavbar attr={navbarState}/>
                    <div className={getTheme()}>
                        {Object.keys(authorProfileState).length > 0 ?
                            <FeedPosts attr={postState} reFetchData={fetchData} whatProfile={"author"} authorProfileState={authorProfileState} handleSort={handleSort}/> : null
                        }
                    </div>
                </> : null
            }
        </div>
    )
}

export default UserInfo