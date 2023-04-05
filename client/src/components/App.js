import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyles";
import Landing from "./Landing";
import NavBar from "./NavBar.js";
import Registration from "./Registration";
import Catalogue from "./Catalogue";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";


const App = () => {
    const { user, isAuthenticated, isLoading, error } = useAuth0();
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mongoUser, setMongoUser] = useState(null);

    useEffect(() => {
        const getUser = async (user) => {
            try {
                if (isAuthenticated) {
                    const response = await fetch (`/bukshelf/${user.email}`, { method: "GET" })
                    const data = await response.json();
                    if (data.userFound === true) {
                    setLoading(false);

                } else {

                }}
            } catch (error) {
                console.log(error);
            } getUser(user);
        }
    }, [isAuthenticated]);

    // console.log("user:", user, "isAuthenticated:", isAuthenticated);

    return (
    <>
        <BrowserRouter>
            <GlobalStyle />
            <Container>
                <NavBar />
                <Routes>
                    <Route path="/" element={ <Landing /> } />
                    <Route path="/bukshelf/register" element={ <Registration /> } />
                    <Route path="/bukshelf/:bukkeeper/catalogue" element={ <Catalogue/> } />
                    <Route path="/bukshelf/:bukkeeper/profile" element={ <Profile/> } />

                </Routes>
            </Container>
        </BrowserRouter>
    </>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 100vw;
    min-width: 300px;
    min-height: fit-content;
    background-color: var(-paper);
`;


export default App;
