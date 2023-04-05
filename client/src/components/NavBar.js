import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Logo from "./Logo.js";
import Spectacles from "./SpecticlesIcon.js";


const NavBar = () => {
    return (
        <NavBarContainer>
            <Element path='/'><Logo /></Element>
            <Element path='/'><Spectacles /></Element>
        </NavBarContainer>
    )
};

const NavBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: black;
    width: 100%;
    min-width: 300px;
    height: 90px;
`;

const Element = styled(NavLink)`
    padding: 25px 40px;
    cursor: pointer;
    /* &:hover {
        scale: 1.1;
    } */
`;

export default NavBar;