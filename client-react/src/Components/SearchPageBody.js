import React, {useState, useEffect} from 'react'
import "../static/css/SearchPageBody.css"
import {getUserToken, getServerToken} from "./CommonUtls"
import {Link} from 'react-router-dom'
import { SERVER_URL } from './CommonUtls'

function SearchPageBody(props) {

    const [foundUsers, setFoundUsers] = useState([])
    const [loading, setLoading] = useState(true)

    function fix_username(value) {
        if (value.slice(0, 9) == "username-") {
            return `u/${value.slice(9,)}`
        } else {
            return value
        }
    }

    let searchString = fix_username(props.searchString)

    function fetchResults(value) {
        setLoading(true)
        let req_body= {
            user_token: getUserToken(),
            server_token: getServerToken(),
            search_string: value
        }
        fetch(`${SERVER_URL}/search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req_body)
        }).then(response => response.json()).then(res => {         
            if (res) {
                setFoundUsers(res.result)
                setLoading(false)
            } else if (res.status === "error 404 not found") {
                
            } else {
                
            }
            }).catch(err => {
            
        })
    }

    useEffect(() => 
        fetchResults(searchString)
    ,[searchString])



    return (
        <div className="search-body-wrap">
            <div className="notification-body">
            {!loading ?
            <div>
                <div className="search-body-header">
                    <p className="white medium light-heavy feed-zero-margin">Search Results for {searchString}...</p>
                </div>
                {foundUsers.length > 0 ?
                foundUsers.map((item) => 
                    <Link style={{textDecoration: "none"}} to={`/feed/profile/${item.username}`}>
                        <div className="fade-in search-result-profile white small-medium">
                            <img style={{marginRight: "30px"}} src={item.profile_image} className="search-result-profile-image" />
                            <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                                <p className="white small-medium light-heavy feed-zero-margin">
                                    {item.name}
                                </p>
                                <p className="light-gray small-medium light-heavy feed-zero-margin">
                                    u/{item.username}
                                </p>
                            </div>
                        </div>
                    </Link>
                    ) :
                    <div className="notification-body-empty-card">
                    <img src={"https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582705/TalentFlex_Static/Others/sad_face1_c5ouzk.png"} />
                    <p style={{marginLeft: "8px"}} className="light-gray medium light-heavy feed-zero-margin">No Search Results</p>
                </div>}
                </div> :
                <div className="notification-body-empty-card">
                    <span style={{height: "3rem", width: "3rem", color: "#d69d00"}} class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span class="sr-only"></span>
            </div>}
            </div>
        </div>
    )
}

export default SearchPageBody