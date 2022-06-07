import React, {useState, useEffect, useRef, useMemo} from 'react'
import "../../static/css/Chat/ChatDisplay.css"
import {getServerToken, getUserToken} from "../CommonUtls"
import db from "./firebase"
import { collection, query, onSnapshot, where, addDoc, Timestamp, setDoc, getDoc, updateDoc, doc} from "firebase/firestore";
import { SERVER_URL } from '../CommonUtls'
import {Link} from "react-router-dom"
import {useMediaQuery} from 'react-responsive'
import PhoneQuickChat from './PhoneQuickChat';
import ChatInputBar from './ChatInputBar';

function PhoneChatDisplay(props) {
    const [toCreds, setToCreds] = useState({})
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [triggerChild, setTriggerChild] = useState(false)

    const scrollRef = useRef(null)

    const isPhone = useMediaQuery({ query: '(min-width: 315px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' })

    const myWidget = useMemo(() => 
        window.cloudinary.createUploadWidget({
            cloudName: process.env.REACT_APP_CLOUD_NAME, 
            uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
            folder: process.env.REACT_APP_FOLDER},
            (error, result) => { 
                if (!error && result && result.event === "success") { 
                    sendFile(result.info.eager[0].secure_url, result.info.resource_type)
                    setTimeout(() => {
                        if (scrollRef.current) {
                        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
                        }
                    }, 3000)
                    
                }
            }
        ))

    function TimestampToDate(timestamp) {
        return(
            `${timestamp.toDate().getHours()}:${timestamp.toDate().getMinutes()}`
        )
    }

    


    // registers the image in firebase with type="file" and label its text as the image_url.
    function sendFile(secure_url, fileType) {
        if (secure_url) {
            if (props.from && props.to) {
                const chatListFrom = doc(db, props.from, "chatList");
                const chatListFromSnap = getDoc(chatListFrom).then(chatListFromSnap => {
                    if (chatListFromSnap.data()) {
                        updateDoc(chatListFrom, {
                            [props.to]: Timestamp.now()
                        });
                    } else {
                        setDoc(chatListFrom, {
                            [props.to]: Timestamp.now()
                        });
                    }
                })

                const chatListTo = doc(db, props.to, "chatList");
                const chatListToSnap = getDoc(chatListTo).then(chatListToSnap => {
                    if (chatListToSnap.data()) {
                        updateDoc(chatListTo, { 
                            [props.from]: Timestamp.now()
                        });
                    } else {
                        setDoc(chatListTo, {
                            [props.from]: Timestamp.now()
                        });
                    }
                });

                // Add message in sender user collection
                addDoc(collection(db, props.from), {
                    text: secure_url,
                    from: props.from,
                    to: props.to,
                    time: Timestamp.now(),
                    type: fileType
                })


                // Add message in receiver user collection
                addDoc(collection(db, props.to), {
                    text: secure_url,
                    from: props.from,
                    to: props.to,
                    time: Timestamp.now(),
                    type: fileType
                })
            }
        }
    }
    

    function sendMessageAct(inputText) {
        if (inputText) {
            const chatListFrom = doc(db, props.from, "chatList");
            const chatListFromSnap = getDoc(chatListFrom).then(chatListFromSnap => {
                if (chatListFromSnap.data()) {
                    updateDoc(chatListFrom, {
                        [props.to]: Timestamp.now()
                    });
                  } else {
                    setDoc(chatListFrom, {
                        [props.to]: Timestamp.now()
                    });
                  }
            })
    
    
            const chatListTo = doc(db, props.to, "chatList");
            const chatListToSnap = getDoc(chatListTo).then(chatListToSnap => {
                if (chatListToSnap.data()) {
                    updateDoc(chatListTo, { 
                        [props.from]: Timestamp.now()
                    });
                  } else {
                    setDoc(chatListTo, {
                        [props.from]: Timestamp.now()
                    });
                  }
            });
    
    
            
    
    
            // Add message in sender user collection
            addDoc(collection(db, props.from), {
                text: inputText,
                from: props.from,
                to: props.to,
                time: Timestamp.now(),
                type: "text"
                })
    
    
            // Add message in receiver user collection
            addDoc(collection(db, props.to), {
            text: inputText,
            from: props.from,
            to: props.to,
            time: Timestamp.now(),
            type: "text"
            })
    
        }
    }

    function sendMessage(e) {
        e.preventDefault()
        setTriggerChild(prev => !prev)
        
    }

    function messagesListenRead() {
        if (props.to) {
            const q = query(collection(db, props.from), where("to", "in", [props.from, props.to]));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const msgs = [];
            querySnapshot.forEach((doc) => {
                msgs.push(doc.data());
            }); 
            const filteredMsgs = msgs.filter((item) => {
                if ([props.from, props.to].includes(item.from)) {
                    return true
                } else {
                    return false
                }
            })
            const sortedMsgs = filteredMsgs.sort((a, b) => a.time.toDate() - b.time.toDate())
            setMessages(sortedMsgs)
            if (scrollRef.current) {
                scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
            }
            })
            setTimeout(() => {
                if (scrollRef.current) {
                scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
                }
            }, 3000)
        };
    }

    function fetchData() {
        if (props.to) {
            setLoading(true)
            let req_body= {
                user_token: getUserToken(),
                server_token: getServerToken(),
                username: props.to
            }
            fetch(`${SERVER_URL}/chat_creds`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req_body)
            }).then(response => response.json()).then(res => {         
                if (res) {
                    setToCreds(res)
                    setLoading(false)
                } else if (res.status === "error 404 not found") {
                    
                } else {
                    
                }
                }).catch(err => {
                
            })
        }
    }

        
    useEffect(() => {
        messagesListenRead()
        fetchData()
  }, [props.to])

    return (
        <div className="chat-display-wrap">
        <PhoneQuickChat
        quickChatOptions={props.quickChatOptions} 
        handleTo={props.handleTo} 
        />
        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <div onClick={() => {
                props.handlePhoneUserLock(false)
            }} className='back-chat-button'>
                <span className="material-icons white md-48">chevron_left</span>
            </div>
            <div className="chat-display-header">
            {!loading ? Object.keys(toCreds).length > 0 ?
                <>
                <Link style={{textDecoration: "none"}} to={`/feed/profile/${toCreds.username}`}>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <img src={toCreds.profile_image} className="fade-in profile-image-comment" style={{marginRight: "25px", width: "43px", height: "43px"}} />
                    <div className="fade-in" style={{display: "flex", flexDirection: "column", justifyContent: "center", marginRight: "30px", minWidth: "100px", maxWidth: isPhone && !isTablet && !isDesktop ? "110px" : "none"}}>
                        <p className="white small-medium light-heavy feed-zero-margin">{toCreds.name}</p>
                        <p className="light-gray light-heavy small feed-zero-margin">u/{toCreds.username}</p>
                    </div>
                </div>
                </Link>
                <svg className="fade-in" height="30" width="30">
                    <circle cx="13" cy="13" r="8" stroke={toCreds.status == "Online" ? "var(--light-green)" : "var(--dark-red)"} stroke-width="4" fill={toCreds.status == "Online" ? "var(--light-green)" : "var(--dark-red)"} />
                </svg>
                </> : null :
                <div style={{height: "inherit", display: "flex",
                flexDirection: "row", justifyContent: "center",
                alignItems: "center", width: "100%"}}>
                    <span style={{height: "2rem", width: "2rem", color: "#d69d00"}} class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span class="sr-only"></span>
                </div>}
            </div>
            </div>
            <div className="chat-display">
            {!loading ? Object.keys(toCreds).length > 0 ?
            <>
                <div className="fade-in chat-messages">

                {messages.length > 0 ? <> {messages.map(item => <div className="message">
                <img src={item.from === props.from ?  props.profile_image : toCreds.profile_image} className="profile-image-chat" />
                <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: isPhone && !isTablet && !isDesktop ? "0px" : "-8px"}}>
                    <p className="white light-heavy small-medium feed-zero-margin">{item.from == props.from ? props.from : props.to}</p>
                    {item.type == "text" ? 
                    <p className="msg-body white feed-zero-margin small-medium">{item.text}<span class="light-gray feed-zero-margin small" style={{marginLeft: "10px"}}>{TimestampToDate(item.time)}</span></p>
                    :
                    item.type == "image" ?
                    <div style={{display: "inline-block", position: "relative"}}>
                        <img className='chat-image' src={item.text} />
                        <span class="light-gray feed-zero-margin small" style={{marginLeft: "10px", position: "absolute", "bottom" : "0px", wordBreak: "keep-all"}}>{TimestampToDate(item.time)}</span>
                    </div> : 
                    <div style={{display: "inline-block", position: "relative"}}>
                        <video className='chat-image' src={item.text} controls/>
                        <span class="light-gray feed-zero-margin small" style={{marginLeft: "10px", position: "absolute", "bottom" : "0px", wordBreak: "keep-all"}}>{TimestampToDate(item.time)}</span>
                    </div>
                }
                </div>
            </div>) 
            }
            <span ref={scrollRef}></span>
            </> : 
            <div className="notification-body-empty-card">
                <img src={"https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582696/TalentFlex_Static/Others/happy_face1_dmihmo.png"} />
                <p style={{marginLeft: "8px"}} className="light-gray medium light-heavy feed-zero-margin">Start a New Chat</p>
            </div>    
                }
                </div>
                <form onSubmit={sendMessage} className="input-div-chat">
                    <ChatInputBar triggerChild={triggerChild} sendIt={sendMessageAct}/>
                    <div onClick={() => {myWidget.open()}} className="send-div-wrap">
                        <span class="material-icons white md-18">post_add</span>
                    </div>
                    <div onClick={sendMessage} className="send-div-wrap">
                        <span class="material-icons white md-18">send</span>
                    </div>
                </form>
                </> : null :
                <div style={{height: "inherit", display: "flex",
                flexDirection: "column", justifyContent: "center",
                alignItems: "center"}}>
                    <span style={{height: "3rem", width: "3rem", color: "#d69d00"}} class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span class="sr-only"></span>
                </div>}
            </div>
        </div>
    )
}

export default PhoneChatDisplay