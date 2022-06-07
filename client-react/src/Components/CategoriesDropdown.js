import React, {useEffect} from "react"
import "../static/css/CategoriesDropdown.css"
import "../static/css/ProfileMore.css"
import AOS from 'aos';
import {Link} from "react-router-dom"
import { useMediaQuery } from 'react-responsive'

function CategoriesDropdown(props){
    useEffect(() => {
        AOS.init();
    }, []);

    const isPhone = useMediaQuery({ query: '(min-width: 315px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' })

    let needed_width = isPhone & !isTablet & !isDesktop ? document.getElementById("feed-s").offsetWidth + 5 :   document.getElementById("feed-s").offsetWidth - 15
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
        <div className="categories-dropdown" data-aos="fade-down" data-aos-duration="400">
                {props.attr.categories.map((item) => 
                    <Link to={`/feed/${item}`} className="white medium categories-item">
                    <div className="categories-item-wrap" style={{width: `${needed_width}px`}}> 
                        <p className="feed-zero-margin" style={{marginRight: "10px"}}>{emojiDict[item]}</p>   
                        <p className="feed-zero-margin">{item}</p>
                    </div>
                    </Link>)
                }
        </div>
    )
}

export default CategoriesDropdown