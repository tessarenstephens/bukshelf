import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyles";
import Landing from "./Landing";
import Registration from "./Registration";
import Profile from "./Profile";
import Catalogue from "./Catalogue";
import NavBar from "./NavBar";


const App = () => {

    return (
    <>
        <BrowserRouter>
            <GlobalStyle />
            <NavBar />
            <Container>
                <Routes>
                    <Route path="/" element={ <Landing /> } />
                    <Route path="/register" element={ <Registration /> } />
                    <Route path="/profile" element={ <Profile /> } />
                    <Route path="/catalogue" element={ <Catalogue /> } />
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
