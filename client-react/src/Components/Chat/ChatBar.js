import React from 'react-dom'
import "../../static/css/Chat/ChatBar.css"
import db from "./firebase"
import { onSnapshot, doc} from "firebase/firestore";
import { useState, useEffect } from 'react';
import {getUserToken, getServerToken} from "../CommonUtls"
import ChatSearch from './ChatSearch';
import { SERVER_URL } from '../CommonUtls'

function ChatBar(props) {
    const [users, setUsers] = useState([])
    const [usersCreds, setUsersCreds] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState(false)

    // opens a new chat whenever the user selects someone from the search results
    function handleNewChat(item) {
        setUsers(prevState => [item, ...prevState])
        props.handlePhoneUserLock(true) // *for small displays* responsible for unmounting the chat bar and rendering chat display
    }

    // fetch the chat list of the user from firebase, sort it and add it to the chatList to be rendered
    useEffect(() => {
        const chatList = doc(db, props.from, "chatList");
        const chatListData = onSnapshot(chatList, (chatListData) => {
            if (chatListData.data()) {
                const usersSorted = Object.keys(chatListData.data()).sort(function(a,b){return chatListData.data()[b]-chatListData.data()[a]})
                props.handleTo(usersSorted[0]) // the recent person the user chatted with will be focused in the chat display
                setUsers(usersSorted)
            } else {
                setLoading(false)
            }
        })
    }, [])

    function fetchData() {
        let req_body = {
            user_token: getUserToken(),
            server_token: getServerToken(),
            chatList: users
        }    
        fetch(`${SERVER_URL}/chat_list_creds`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req_body)
        }).then(response => response.json()).then(res => {
            if (res.status === "Online") {
                setUsersCreds(res.chatList_creds)
                props.handleQuickChatOptions(res.chatList_creds)
                setLoading(false)
                
            } else if (res.status === "error 404 not found") {
                
            } else {
                
            }
            }).catch(err => {
            
        })
    }

    

    useEffect(() => {
        
        // onMount check
        if (users.length > 0) {
            fetchData()
        }
    }, [users])
    


    return (
        <>
        <div className="chat-bar-wrap">
        {!loading ? !search ?
            <>
            {usersCreds.length > 0 ? 
                <>
            <p onClick={() => setSearch(true)} className="fade-in medium white light-heavy chat-bar-header feed-zero-margin">Start New Chat</p>
            {usersCreds.map((item) => 
                <div className="fade-in chat-list-user-creds" onClick={() => {props.handleTo(item.username);props.handlePhoneUserLock(true)}}>
                    <img src={item.profile_image} className="profile-image-chat" style={{marginRight: "1em", width: "50px", height: "50px"}}/>
                    <div style={{display: "flex", flexDirection: "column", justifyContent: ""}}>
                        <p className="white small-medium light-heavy feed-zero-margin">{item.name}</p>
                        <p className="light-gray light-heavy small feed-zero-margin">{item.username}</p>
                    </div>
                </div>)}
                </>: <p onClick={() => setSearch(true)} className="fade-in medium white light-heavy chat-bar-header feed-zero-margin">Start New Chat</p>}
                </> : <ChatSearch handleNewChat={handleNewChat} handleTo={props.handleTo} handleSearch={(item) => setSearch(item)} />
                :
                <div style={{height: "inherit", display: "flex",
                flexDirection: "column", justifyContent: "center",
                alignItems: "center"}}>
                    <span style={{height: "3rem", width: "3rem", color: "#d69d00"}} class="spinner-border spinner-border-sm" role="status" taria-hidden="true"></span>
                    <span class="sr-only"></span>
                </div>
                }
        </div>
        </>
    )
}

export default ChatBar

