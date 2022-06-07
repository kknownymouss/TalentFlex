// return the user data from the session storage
export const getUserToken = () => {
    return sessionStorage.getItem('user_token') || null
}
   
// return the token from the session storage
export const getServerToken = () => {
    return sessionStorage.getItem('server_token') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('server_token');
    sessionStorage.removeItem('user_token');
}

// set the token and user from the session storage
export const setUserSession = (server_token, user_token) => {
    sessionStorage.setItem('server_token', server_token);
    sessionStorage.setItem('user_token', user_token);
}


// set the theme of the website
export const setTheme = (theme) => {
    sessionStorage.setItem('theme', theme);
}

// returns which theme we are using
export const getTheme = () => {
    return sessionStorage.getItem('theme') || null;
}

// checks if the user is logged in and returns a boolean
export const isLogin = () => {
     return (getUserToken() && getServerToken() ? true : false)
}

// the server url to which all requests are sent
export const SERVER_URL = "https://talentflex.herokuapp.com"