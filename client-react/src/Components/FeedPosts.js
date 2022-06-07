import React from "react"
import "../static/css/FeedPosts.css"
import Post from "./Post"
import Extras from "./Extras"
import AuthorProfile from "./AuthorProfile"
import FeedSortBar from "./FeedSortBar"
import CategoryProfile from "./CategoryProfile"


function FeedPosts(props) {
    return (
        <div className="feed-body">
            <div className="feed-posts">
                <FeedSortBar handleSort={props.handleSort} />
            {props.attr.length > 0 ? props.attr.map(item => 
                <Post attr={{
                    post_id: item.post_id,
                    image: item.media,
                    caption: item.caption,
                    username: item.user,
                    profile_image: item.profile_image,
                    category: item.category,
                    timePosted: item.date_text,
                    type: item.type,
                    number_of_likes: item.number_of_likes,
                    number_of_comments: item.number_of_comments,
                    liked_by_user: item.liked_by_user
                }} reFetchData={props.reFetchData}/>
                )
                : <div className="post"><p className="no-uploads white light-heavy medium feed-zero-margin">No posts uploaded yet.</p></div>
            }
            </div>
            {props.whatProfile === "extra" ? 
            <div className="feed-extras">
                <Extras attr={{
                    header: "Top Talents",
                    one: "t/Gaming",
                    two: "t/Editing",
                    three: "t/Drawing",
                    four: "t/Music",
                    five: "t/Dancing",
                }}/>
                <Extras attr={{
                    header: "Top Users",
                    one: "u/Alex_jones",
                    two: "u/Harryco90",
                    three: "u/baker920",
                    four: "u/gamerpro420",
                    five: "u/christianjoe",
                }} />
            </div> : null}

            {props.whatProfile === "author" ?
                <div className="author-profile-wrap">
                    <AuthorProfile attr={props.authorProfileState} />
                </div> : null
            }

            {props.whatProfile === "category" ?
                <div className="author-profile-wrap">
                    <CategoryProfile attr={props.categoryProfileState} />
                </div> : null
            }
        </div>
    )
}


export default FeedPosts