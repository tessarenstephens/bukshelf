import React, { useEffect, useContext } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import LoginSignup from "./LoginSignup";
import LogoutButton from './LogoutButton';
import LoadingState from './LoadingState';
import bookShelf from '../assets/bookShelf.jpg';
import { UserContext } from './UserContext';

// LANDING PAGE STATES: LOGIN/SIGN UP / LOGOUT

const Landing = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth0();
    const { loggedInUser } = useContext(UserContext);

    // if user is NOT in mongoDB, redirect to REGISTRATION
    useEffect(() => {
        if (user) {
        fetch (`/api/bukkeeper/verify?email=${user.email}`)
        .then(response => response.json())
        .then(data => {
            if (data.inDB === false) {
                console.log("DATA INDB:", data)
                navigate('/register');
            } else {
                navigate('/');
            }
        })
        .catch(error => console.log("LANDING GET ERROR:", error))
        }
    }, [user])

    

    return (
        <Container>
            { !isAuthenticated && <LoginSignup /> }

            { isAuthenticated && !loggedInUser && <LoadingState/>}

            { isAuthenticated && loggedInUser && <LogoutButton /> }

            <Div src={`${bookShelf}`}/>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--paper);
    width: 100%;
    height: fit-content;
`;


const Div = styled.img`
    width: 100%;
    height: 500px;
    object-fit: cover;
`;




export default Landing;