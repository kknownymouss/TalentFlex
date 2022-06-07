import React from "react"
import HomeLanding from "./HomeLanding"
import AboutLanding from "./AboutLanding"
import ContactLanding from "./ContactLanding"
import "../static/css/root.css"
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom'
import LoginLanding from "./LoginLanding"
import SignupLanding from "./SignupLanding"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"
import Feed from "./Feed"
import FeedComments from "./FeedComments"
import Upload from "./Upload/Upload"
import UserInfo from "./UserInfo"
import NotificationPage from "./NotificationPage"
import Settings from "./Settings/Settings"
import SearchPage from "./SearchPage"
import Chat from "./Chat/Chat"

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" exact>
            <Redirect to="/home" exact />
          </Route>
          <Route path="/home" exact component={HomeLanding} />
          <Route path="/about" exact component={AboutLanding} />
          <Route path="/contact" exact component={ContactLanding}/>
          <PublicRoute path="/login" exact component={LoginLanding} />
          <PublicRoute path="/signup" exact component={SignupLanding} />
          <PrivateRoute path="/feed/search/:searchString" exact component={SearchPage} />
          <PrivateRoute path="/feed/profile/:userUsername" exact component={UserInfo} />
          <PrivateRoute path="/feed/notifications" exact component={NotificationPage} />
          <PrivateRoute path="/chat" exact component={Chat} />
          <PrivateRoute path="/feed/:category" exact component={Feed} />
          <PrivateRoute path="/feed/:category/:postID" exact component={FeedComments} />
          <PrivateRoute path="/upload" exact component={Upload} />
          <PrivateRoute path="/settings/Profile" exact component={Settings}/>
          <PrivateRoute path="/settings/Account" exact component={Settings}/>
          <PrivateRoute path="/settings/Notifications" exact component={Settings}/>
          <PrivateRoute path="/settings/Guidelines" exact component={Settings}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App