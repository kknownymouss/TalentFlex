import React, { useState } from 'react'
import ChatBar from './ChatBar'
import ChatDisplay from './ChatDisplay'
import PhoneChatDisplay from './PhoneChatDisplay'
import "../../static/css/Chat/ChatInterface.css"
import {useMediaQuery} from "react-responsive"

function ChatInterface(props) {
    const [to, setTo] = useState("")

    // *for small displays*
    const [phoneUserLock, setPhoneUserLock] = useState(false) // means that a user was selected to chat with.
    const [quickChatOptions, setQuickChatOptions] = useState([])

    const isPhone = useMediaQuery({ query: '(min-width: 315px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' })

    // selects target user (one you want to text with)
    function handleTo(to) {
        setTo(to)
    }

    return (
        <>
        {
        isPhone && !isTablet && !isDesktop ?
        <div className="chat-interface-wrap">
        {!phoneUserLock ? 
            <ChatBar 
            handleTo={handleTo} 
            from={props.from} 
            handlePhoneUserLock={(item) => {
                setPhoneUserLock(item)
            }}
            handleQuickChatOptions={(items) => {
                setQuickChatOptions(items)
            }}
            /> 
            : 
            <PhoneChatDisplay
            profile_image={props.profile_image}
            to={to}
            handleTo={handleTo} 
            handlePhoneUserLock={(item) => {
                setPhoneUserLock(item)
            }} 
            quickChatOptions={quickChatOptions}
            from={props.from} /> }
        </div>
         :
        <div className="chat-interface-wrap">
            <ChatBar 
            handleTo={handleTo}
            from={props.from} 
            handlePhoneUserLock={(item) => {
                setPhoneUserLock(item)
            }} 
            handleQuickChatOptions={(items) => {
                setQuickChatOptions(items)
            }}
            />
            <ChatDisplay profile_image={props.profile_image} to={to} from={props.from} />
        </div>

        }

        </>
    )
}

export default ChatInterface