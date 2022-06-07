import React, {useEffect, useState} from "react"
import {getServerToken, getUserToken, getTheme} from "./CommonUtls"
import FeedNavbar from "./FeedNavbar"
import FeedPosts from "./FeedPosts"
import "../static/css/Feed.css"
import { SERVER_URL } from './CommonUtls'

import Error404 from "./Error404"
function Feed({match}) {
    const categoryName = match["params"]["category"]
    const [postState, setPostState] = useState([])
    const [navbarState, setNavbarState] = useState({})
    const [error404, setError404] = useState("None")
    const [categoryProfileState, setCategoryProfileState] = useState({})
    const [sort, setSort] = useState("New")


    function handleSort(sortType) {
        setSort(sortType)
    }
    
    let req_body = {
        user_token: getUserToken(),
        server_token: getServerToken(),
        category: categoryName,
        sort: sort
    }

    console.log(sort)

    function fetchData() {
        fetch(`${SERVER_URL}/feed`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req_body)
        }).then(response => response.json()).then(res => {
            if (res.status === "Online" || res.status === "Offline") {
                setNavbarState(prevState => ({
                    ...res,
                    category: categoryName
                }))
                setPostState(res.posts)
                setCategoryProfileState(res.category_profile)
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
    }, [categoryName, sort])
    return (        
        <div>
            {error404 !== "None" ? error404 === "Reset" ? <Error404 attr={{resetSession: true}} /> : <Error404 attr={{resetSession: false}} /> : null}
            {Object.keys(navbarState).length > 0 ? 
                <>
                    <FeedNavbar attr={navbarState}/>
                    <div className={getTheme()}>
                        {Object.keys(categoryProfileState).length > 0 ?
                            <FeedPosts attr={postState} reFetchData={fetchData} whatProfile={"category"} categoryProfileState={categoryProfileState} handleSort={handleSort}/> : null
                        }
                    </div>
                </> : null
            }
        </div>
    )
}

export default Feed