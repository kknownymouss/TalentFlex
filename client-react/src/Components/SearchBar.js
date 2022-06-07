import React, {useEffect, useState} from "react";
import "../static/css/SearchBar.css"
import { getServerToken, getUserToken } from "./CommonUtls";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";
import { SERVER_URL } from './CommonUtls'

function SearchBar(props) {

    useEffect(() => {
        AOS.init()
    })
    const [requestTimeout, setRequestTimeout] = useState(null)
    const [searchText, setSearchText] = useState("")
    const [searchDrop, setSearchDrop] = useState(false)
    const [foundUsers, setFoundUsers] = useState([])
    const [loading, setLoading] = useState(false)

    function pretty_username(string_value) {
        if (string_value.slice(0, 2) == "u/") {
            return `username-${string_value.slice(2,)}`
        } else {
            return string_value
        }

    }



    function fetchResults(value) {
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

    function handleSearchTextChange(e) {
        if ((e.target.value).length > 0) {
            setSearchDrop(true)
            props.shutdownPopup()
        } else {
            setLoading(false)
            setSearchDrop(false)
        }
        setLoading(true)
        clearTimeout(requestTimeout)
        setSearchText(e.target.value)
        setRequestTimeout(() => setTimeout(() => {fetchResults(e.target.value)}, 2000))
    }

    return (
        <div className="feed-mid-navbar">
            <div className="search-icon">
                <span class="material-icons black md-24">search</span>
            </div>
            <input onChange={handleSearchTextChange} class="black form-control light-heavy white feed-search" type="email" placeholder="Search Users..." value={searchText} ></input>
            {searchDrop & props.searchDropFree ?
            <div  data-aos-once="true" data-aos="fade-up" data-aos-duration="500" className="search-drop">
                <p style={{padding: "25px", backgroundColor: "var(--age)", borderRadius: "8px 8px 0px 0px"}} className="white light-heavy small-medium feed-zero-margin">Search results for {searchText}...</p>
                <div className="search-results-wrap">
                    {!loading ?
                        foundUsers.length > 0 ?
                        <div style={{minHeight: "350px"}}>
                            {foundUsers.slice(0, 4).map((item) => 
                            <Link onClick={() => {setSearchDrop(false);setSearchText("")}} style={{textDecoration: "none"}} to={`/feed/profile/${item.username}`}>
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
                            )}
                            {foundUsers.length > 4 ?
                                <Link onClick={() => {setSearchDrop(false);setSearchText("")}} style={{textDecoration: "none"}} to={`/feed/search/${pretty_username(searchText)}`}>
                                 <p style={{backgroundColor: "var(--age)", textAlign: "center", padding: "10px", borderRadius: "0px 0px 8px 8px"}} className="white light-heavy small-medium feed-zero-margin">More search results...</p>
                                 </Link> :
                            null}
                         </div>
                     : 
                    <div className="fade-in notification-empty-card">
                        <img src={"https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582705/TalentFlex_Static/Others/sad_face1_c5ouzk.png"} />
                        <p style={{marginLeft: "8px"}} className="light-gray medium light-heavy feed-zero-margin">No Search Results</p>
                    </div>
                     : 
                    <div className="fade-in" style={{height: "350px", display: "flex",
                    flexDirection: "column", justifyContent: "center",
                    alignItems: "center"}}>
                        <span style={{height: "3rem", width: "3rem", color: "#d69d00"}} class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span class="sr-only"></span>
                    </div>
                }
                </div>
            </div> : null
            }
        </div>
    )
}

export default SearchBar