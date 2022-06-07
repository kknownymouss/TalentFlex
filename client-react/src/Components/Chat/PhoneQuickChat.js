import React from 'react'
import "../../static/css/Chat/PhoneQuickChat.css"

function PhoneQuickChat(props) {
    return (
        <div className='quick-chat-wrap'>
        {props.quickChatOptions.length > 0 ?
            props.quickChatOptions.map(item => 
            <div style={{display: "inline-block"}}>
                <div onClick={() => {
                    props.handleTo(item.username)
                }} className='quick-chat-circle'>
                    <img className='profile-image-chat' style={{marginRight: "0px",border: "3px solid var(--light-green)"}} src={item.profile_image} />
                    <p className="white light-heavy feed-zero-margin small-medium">{item.username.slice(0, 7)}..</p>
                </div>
            </div>
            )
            :
        null
        }
        </div>
    )
}

export default PhoneQuickChat