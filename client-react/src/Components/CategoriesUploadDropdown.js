import React, {useEffect, useState} from "react"
import "../static/css/CategoriesDropdown.css"
import "../static/css/ProfileMore.css"
import AOS from 'aos';
import {useMediaQuery} from "react-responsive"

function CategoriesUploadDropdown(props){

    function categClick(value) {
        props.handleCategSelect(value)
        props.handleCategClick()
    }

    const isPhone = useMediaQuery({ query: '(min-width: 315px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' })


    useEffect(() => {
        AOS.init();
    }, []);
    
    let needed_width = isPhone & !isTablet & !isDesktop ? document.getElementById("jas71").offsetWidth - 10 :   document.getElementById("jas71").offsetWidth - 10
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

    return (
        <div style={{maxHeight: "240px"}} className="categories-dropdown" data-aos="fade-down" data-aos-duration="400">
                {props.attr.categories.map((item) => 
                    <div onClick={ () => categClick(item)} className="categories-item-wrap white medium categories-item" style={{width: `${needed_width}px`, padding: isPhone & !isTablet & !isDesktop ? "20px 30px" : "15px 30px"}}> 
                    <p className="feed-zero-margin" style={{marginRight: "10px"}}>{emojiDict[item]}</p>   
                        <p className="feed-zero-margin">{item}</p>
                    </div>
                    )
                }
        </div>
    )
}

export default CategoriesUploadDropdown