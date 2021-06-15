import React from "react";
import axios from 'axios';

const defaultState = {
    token: null,
    loggedIn: false,
    user: {},
}
const UserContext = React.createContext(defaultState)

export default UserContext

class UserProvider extends React.Component {
    state = {
        token: null,
        loggedIn: false,
        user: {},
    }
    constructor(props) {
        super(props)
        this.state = {
            token: localStorage.getItem("token"),
            loggedIn: localStorage.getItem("loggedIn"),
            user: JSON.parse(localStorage.getItem("user")),    
        }
        console.log(localStorage)
    }
    setToken = (token) => {
        this.setState({ 
            token: token
        })
        localStorage.setItem("token", token)
        axios.defaults.headers.common['api_key'] = token;
    }
    signOut = () => {
        this.setState({ 
            loggedIn: false,
            user: {}
        })
        localStorage.clear()
        this.majorityCheckout()
    }

    signIn = (user) => {
        this.setState({ 
            loggedIn: true,
            user: user
        })
        localStorage.setItem("loggedIn", true)
        localStorage.setItem("user", JSON.stringify(user))
    }

    render() {
        const { children } = this.props
        const { token, loggedIn, user } = this.state
        return (
        <UserContext.Provider
            value={{
                token,
                loggedIn,
                user,
                setToken: this.setToken,
                signOut: this.signOut,
                signIn: this.signIn
            }}
        >
            {children}
        </UserContext.Provider>
        )
    }
}

const useUserContext = () => React.useContext(UserContext);

export { UserProvider, useUserContext }