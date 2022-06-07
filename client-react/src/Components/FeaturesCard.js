import React from 'react'
import '../static/css/FeaturesCard.css'

function FeaturesCard(props) {
    return (
        <div className="feature-card" style={{backgroundImage: `url(${props.attr.bg})`}}>
            <img src={props.attr.img} />
            <h2 className="feature-card-title light-heavy big black">{props.attr.title}</h2>
            <p className="feature-card-text light-heavy small black">{props.attr.text}</p>
        </div>
    )
}

export default FeaturesCard