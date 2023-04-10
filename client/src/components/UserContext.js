import React, { createContext, useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";


export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

    const { user, isAuthenticated } = useAuth0();
    const [loggedInUser, setLoggedInUser] = useState(null);

    // match Auth0 email to mongo email to set loggedInUser
    useEffect(() => {
        if (isAuthenticated) {
            fetch (`/api/bukkeeper/${user.email}`)
            .then(response => response.json())
            .then(data => {
                if(data.status === 200) {
                setLoggedInUser(data.data);
                } else {
                    throw new Error("USER CONTEXT GET ERROR:", data)
                }
            })
            .catch(error => console.log("USER CONTEXT GET ERROR:", error))
        }
    }, [isAuthenticated])


    return (
            <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
                {children}
            </UserContext.Provider>
    )

};