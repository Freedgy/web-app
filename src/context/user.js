import React from "react";

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
    componentDidMount() {
        this.setState({
            token: localStorage.getItem("token"),
            loggedIn: localStorage.getItem("loggedIn"),
            user: JSON.parse(localStorage.getItem("user")),    
        })
    }
    render() {
        const { children } = this.props
        const { token, loggedIn, user } = this.state
        return (
        <UserContext.Provider
            value={{
                token,
                loggedIn,
                user
            }}
        >
            {children}
        </UserContext.Provider>
        )
    }
}

export { UserProvider }