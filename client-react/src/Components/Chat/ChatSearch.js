import React, {useEffect, useState} from "react";
import "../../static/css/Chat/ChatSearch.css"
import { getServerToken, getUserToken } from "../CommonUtls";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { SERVER_URL } from '../CommonUtls'

function ChatSearch(props) {

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
        <>
        <div style={{marginTop: "10px"}} className="fade-in feed-mid-navbar">
            <div className="search-icon">
                <span class="material-icons black md-24">search</span>
            </div>
            <input style={{borderRadius: "0px"}} onChange={handleSearchTextChange} class="black form-control light-heavy white feed-search" type="email" placeholder="Search Users..." value={searchText} ></input>
            <div onClick={() => props.handleSearch(false)} className="exit-icon">
                <span class="material-icons white md-24">highlight_off</span>
            </div>
        </div>
            {searchDrop ?
            <div  data-aos-once="true" data-aos="fade-up" data-aos-duration="500">
                <div className="search-results-wrap">
                    {!loading ?
                        foundUsers.length > 0 ?
                        <div>
                            {foundUsers.map((item) => 
                                <div onClick={() => {props.handleTo(item.username);props.handleSearch(false);props.handleNewChat(item.username)}} className="fade-in chat-search-result-profile white small-medium">
                                    <img style={{marginRight: "30px"}} src={item.profile_image} className="chat-search-result-profile-image" />
                                    <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                                        <p className="white small-medium light-heavy feed-zero-margin">
                                            {item.name}
                                        </p>
                                        <p className="light-gray small light-heavy feed-zero-margin">
                                            u/{item.username}
                                        </p>
                                    </div>
                                </div>
                            )}
                         </div>
                     : 
                    <div style={{backgroundColor: "transparent"}} className="fade-in notification-empty-card">
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
            </>
        
    )
}

export default ChatSearch