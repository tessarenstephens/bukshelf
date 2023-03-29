import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyles";
import HomePage from "./HomePage";
import NavBar from "./NavBar.js";

const App = () => {
    return (
    <>
        <BrowserRouter>
            <GlobalStyle />
            <Container>
            {window.scrollTo(0,0)}
                <NavBar />
                <Routes>
                    <Route to="/" element={<HomePage />}/>

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
    min-height: fit-content;
    background-color: var(-paper);
`;


export default App;
