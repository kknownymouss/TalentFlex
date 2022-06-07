import React, {useState, useEffect} from "react"


function ChatInputBar(props) {
    const [inputText, setInputText] = useState("")
    

    function handleChange(e) {
        setInputText(e.target.value)
    }

    useEffect(() => {
        props.sendIt(inputText)
        setInputText("")
    }, [props.triggerChild])
    return (
        <input onChange={handleChange} type="text" class="form-control input-chat-form small" placeholder="Enter Message" value={inputText} />   
    )
}

export default ChatInputBar