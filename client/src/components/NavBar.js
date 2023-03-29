import React from 'react';
import styled from 'styled-components';
import Logo from "./Logo.js";


const NavBar = () => {
    return (
        <NavBarContainer>
        <Logo />
        </NavBarContainer>
    )
};

const NavBarContainer = styled.div`
    margin: 10%;
    width: 50%;
`;



export default NavBar;