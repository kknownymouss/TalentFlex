import React, {useEffect} from 'react'
import "../static/css/Error404.css"
import {Link} from "react-router-dom"
import {removeUserSession} from "./CommonUtls"

function Error404(props) {
    useEffect(() => {
        if (props.attr.resetSession) { 
            removeUserSession() 
        }
    }, [])
    return (
        <section class="page_404">
            <div class="container">
            <div class="row"> 
            <div class="col-sm-12">
            <div class="col-sm-10 col-sm-offset-1  text-center">
            <div class="four_zero_four_bg">
                <h1 class="text-center ">404</h1>
            </div>
    
            <div class="contant_box_404">
            <h2>
            {props.attr.resetSession ? "Looks like something went wrong" : "Looks like you're lost"}
            </h2>
            <p className="light-heavy">{"The page you are looking for not available !"}</p>
            
            <Link to={props.attr.resetSession ? "/home" : "/feed/Random"}>
                <button type="button" class="btn btn-success light-heavy go-home-button">{props.attr.resetSession ? "Go Home" : "Go Back To Feed"}</button>
            </Link>
            </div>
                </div>
                </div>
                </div>
            </div>
        </section>
    )
}

export default Error404