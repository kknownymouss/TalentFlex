import React, {useState, useEffect} from 'react'
import "../static/css/FeedSortBar.css"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useMediaQuery } from 'react-responsive'

function FeedSortBar(props) {
    const [activeSort, setActiveSort] = useState("New")
    const isPhone = useMediaQuery({ query: '(min-width: 315px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' })

    useEffect(() => {
        AOS.init();
      }, []);

    function handleSort(sortOption) {
        if (sortOption === "Top") {
            setActiveSort(sortOption)
            props.handleSort(sortOption)
        } else {
            setActiveSort(sortOption)
            props.handleSort(sortOption)
        }
    }


    return (
        <div className="feed-sort-bar">
            <p style={{padding: "6px", borderRadius: "15px", border: "2px solid transparent", display:  isPhone && !isTablet && !isDesktop ? "none" : "" }} className="light-gray light-heavy medium feed-zero-margin">Sort By:</p>
            <div  onClick={() => handleSort("Trending")} className={ activeSort === "Trending" ? "white light-heavy medium sort-option-active" : "white light-heavy medium feed-zero-margin sort-option"} style={{display: "flex", alignItems: "center"}}>
                <span style={{marginRight: "6px"}} className={ isPhone & !isTablet & !isDesktop ? "material-icons md-24 white" : "material-icons md-36 white"}>trending_up</span>
                <p className="feed-zero-margin">Trending</p>
            </div>

            <div  onClick={() => handleSort("New")} className={ activeSort === "New" ? "white light-heavy medium sort-option-active" : "white light-heavy medium feed-zero-margin sort-option"} style={{display: "flex", alignItems: "center"}}>
                <span style={{marginRight: "6px"}} className={ isPhone & !isTablet & !isDesktop ? "material-icons md-24 white" : "material-icons md-36 white"}>new_releases</span>
                <p className="feed-zero-margin">New</p>
            </div>

            <div  onClick={() => handleSort("Random")} className={ activeSort === "Random" ? "white light-heavy medium sort-option-active" : "white light-heavy medium feed-zero-margin sort-option"} style={{display: "flex", alignItems: "center"}}>
                <span style={{marginRight: "6px"}} className={ isPhone & !isTablet & !isDesktop ? "material-icons md-24 white" : "material-icons md-36 white"}>shuffle</span>
                <p className="feed-zero-margin">Random</p>
            </div>

            <div  onClick={() => handleSort("Top")} className={ activeSort === "Top" ? "white light-heavy medium sort-option-active" : "white light-heavy medium feed-zero-margin sort-option"} style={{display: "flex", alignItems: "center"}}>
                <span style={{marginRight: "6px"}} className={ isPhone & !isTablet & !isDesktop ? "material-icons md-24 white" : "material-icons md-36 white"}>bar_chart</span>
                <p className="feed-zero-margin">Top</p>
            </div>
        </div>
    )
}

export default FeedSortBar