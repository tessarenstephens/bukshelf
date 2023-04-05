import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import Login from "./LoginSignup";
import LogoutButton from "./LogoutButton";
import Profile from './Profile';
import Registration from './Registration';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";


const Landing = () => {
    const { user, isAuthenticated, isLoading, error } = useAuth0();
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mongoUser, setMongoUser] = useState(null);


    const navigate = useNavigate();

    useEffect(() => {
        const verifyUser = async (user) => {
            try {
                if (isAuthenticated) {
                    const response = await fetch (`/bukshelf/verify?email=${user.email}`, { 
                        method: "GET"
                    })
                    const data = await response.json();
                    if (data.inDB === true) {
                    setLoading(false);
                    navigate('/bukshelf/:bukkeeper/catalogue'); 
                    } else {
                    navigate("/bukshelf/register");
                    setAuthUser(data.data)
                    }
                }
            } catch (error) {
                console.log(error);
            }
            verifyUser(user);
            setMongoUser(user);
        } 
    }, [isAuthenticated]);


// LANDING PAGE STATES:
    // if user NOT logged in - <LoginSignup /> 
        // if user has successfully signed up - <Registration />
    // if user logged in - <Profile />
    // if user logged in - <LogoutButton />
console.log(isLoading, isAuthenticated);
    return (

        <Container>
            {!isAuthenticated && <Login />}

            {error && <p>Authentication Error</p>}
            {!error && isLoading && <p>Loading...</p>}
            {!error && !isLoading && (
                <>
                
                <Profile />
                <LogoutButton />
                </>
            )}
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--paper);
    width: 100%;
    height: 100vh;
`;







export default Landing;