import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Logo from "./Logo.js";
import Spectacles from "./SpecticlesIcon.js";
import { useAuth0 } from '@auth0/auth0-react';


const NavBar = () => {
    const { isAuthenticated, user } = useAuth0();

    return (
        <NavBarContainer>
            <Element to='/' ><Logo /></Element>
            {isAuthenticated &&
            <Element to='/profile'><Spectacles /></Element>}
            {!isAuthenticated &&
            <Element ><Spectacles /></Element>}
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
    height: 15%;
    min-height: 90px;
`;

const Element = styled(NavLink)`
    padding: 25px 40px;
    cursor: pointer;
`;

export default NavBar;