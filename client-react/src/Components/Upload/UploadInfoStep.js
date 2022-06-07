import React, {useState, useEffect} from 'react'
import "../../static/css/Upload/UploadInfoStep.css"
import CategoriesUploadDropdown from '../CategoriesUploadDropdown'
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useMediaQuery} from 'react-responsive'

function UploadInfoStep(props) {
    useEffect(() => {
        AOS.init();
      }, []);

    const [captionState, setCaptionState] = useState("")
    const [categState, setCategState] = useState("Random")
    const [categDrop, setCategDrop] = useState(false)

    const emojiDict = {
        Random: "⁉",
        Gaming: "🎮",
        Editing: "💻",
        Drawing: "✏",
        "Music Production": "🎶",
        Singing: "🎤",
        Soccer: "⚽",
        Design: "💻",
        Dancing: "💃",
        Technology: "👩‍💻",
        Photography: "📸"
    }

    // Media Queries
    const isPhone = useMediaQuery({ query: '(min-width: 315px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' })

    function handleCategClick() {
        categDrop ? setCategDrop(false) : setCategDrop(true)
    }

    function handleCategSelect(value) {
        setCategState(value)
    }


    function handleTextChange(item) {
        setCaptionState(item.target.value)
    }
    
    function moveOn() {
        props.uploadCaption(captionState)
        props.uploadTalent(categState)
        props.increaseCounter()
    }

    function moveBack() {
        props.decreaseCounter()
    }

    return (
        <div className="add-info-wrap" data-aos="fade-down" data-aos-duration="750">
                <div className="add-info">
                    <p className="light-heavy light-gray feed-zero-margin medium" style={{minWidth: isPhone && !isTablet && !isDesktop ? "85px" :"130px"}}>Select Talent : </p>
                    <div id="jas71" class="dropdown" >
                        <button class="btn btn-secondary categories-upload btn-lg medium dropdown-toggle" type="button" onClick={handleCategClick}>
                            
                            <p className="feed-zero-margin" style={{marginRight: "10px", display: "inline"}}>{emojiDict[categState]}</p>   
                           
                            <span style={{marginRight: isPhone && !isTablet && !isDesktop ? "25px" : "100px"}}>{categState}</span>
                        </button>
                        {categDrop ? <CategoriesUploadDropdown handleCategSelect={handleCategSelect} handleCategClick={handleCategClick} attr={props.attr}/> : null}
                    </div>
                </div>
                <div className="add-info white light-heavy">
                    <p className="light-heavy light-gray feed-zero-margin medium" style={{minWidth: isPhone && !isTablet && !isDesktop ? "85px" :"130px"}}>Add Caption : </p>
                    <textarea style={{width: "100%",  marginLeft: "10px", fontSize: isPhone && !isTablet && !isDesktop ? "12px" : "1rem"}} class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Describe your post..." value={captionState} onChange={handleTextChange}></textarea>
                </div>
                <div className="next-but-wrap-div">
                    <button onClick={moveBack} type="button" class="btn btn-danger light-heavy medium back-upload-button">Back</button>
                    <button onClick={moveOn} className="btn btn-success light-heavy medium success-upload-button">Next</button>
                </div>
        </div>
    )
}

export default UploadInfoStep