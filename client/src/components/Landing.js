import React, { useEffect, useContext, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import LoginSignup from "./LoginSignup";
import LoadingState from './LoadingState';
import { UserContext } from './UserContext';
import BukkeeperLanding from './BukkeeperLanding';

// LANDING PAGE STATES: LOGIN/SIGN UP / PROFILE LINK

const Landing = () => {
    const navigate = useNavigate();
    const { user } = useAuth0();
    const { loggedInUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [noUser, setNoUser] = useState(true);
    const [mustRegister, setMustRegister] = useState(true);

    // if user is NOT in mongoDB, redirect to REGISTRATION
    useEffect(() => {
        if (user) {
        fetch (`/api/bukkeeper/verify?email=${user.email}`)
            .then(response => response.json())
            .then(data => {
                if(data.inDB === false) {
                    console.log("DATA INDB:", data)
                    setLoading(true)
                    setNoUser(false)
                    setMustRegister(true)
                    navigate('/register')
                } else {
                    setLoading(false)
                    setNoUser(false)
                    setMustRegister(false)
                    navigate('/')
                } 
        })
        .catch(error => console.log("LANDING GET ERROR:", error))
        }; setLoading(false);
    }, [user])

    console.log("user",user, "/ loading:",loading, "/ noUser:",noUser, "/ mustRegister:",mustRegister)


if (loading === true && noUser === false && mustRegister === true) {
    return <LoadingState /> 
}

if (loading === false && noUser === true && mustRegister === true && loggedInUser === null) {
    return <LoginSignup />
};

if (loggedInUser && user && noUser === false && mustRegister === false) {
    return <BukkeeperLanding />
}

    return (
        <Container>
            {<LoginSignup />}
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

export default Landing;