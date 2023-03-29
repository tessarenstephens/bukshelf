import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyles";
import Home from "./Pages/Home";
import NavBar from "./NavBar.js";

const App = () => {
    return (
    <>
        <BrowserRouter>
            <GlobalStyle />
            <Container>
                <NavBar />
                <Routes>
                    {/* <Route to="/" element={<Home />}/> */}
                    {/* <Route to="/sign-up" element={<CreateProfile />}/> */}
                    {/* <Route to="/sign-in" element={<SignIn />}/> */}
                    {/* <Route to="/my-dashboard" element={<Dashboard />}/> */}
                        {/* add routes within dashboard? */}

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
    width: 100vw;
    min-height: fit-content;
    background-color: var(-paper);
`;


export default App;
