import React, { useContext } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from './UserContext.js';
import { NavLink } from 'react-router-dom';
import Logo from "./Logo.js";
import Spectacles from "./SpectaclesIcon.js";
import BuksIcon from './BuksIcon.js';


const NavBar = () => {
    const { isAuthenticated } = useAuth0();
    const { loggedInUser } = useContext(UserContext);
    return (
        <NavBarContainer>
            <LogoDiv to='/' ><Logo /></LogoDiv>

            {loggedInUser && (
                <ElementContainer>
                    <CatalogueDiv to='/catalogue'>
                        <BuksIcon />
                    </CatalogueDiv>
                    <SpectaclesDiv to='/profile'>
                        <Spectacles />
                    </SpectaclesDiv>
                </ElementContainer>
            )}

        </NavBarContainer>
    )
};

const NavBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: black;
    width: 100%;
    min-width: 350px;
    height: 15%;
    min-height: 90px;
`;

const ElementContainer = styled.div`
    display: flex;
    align-items: flex-end;
    width: fit-content;
`;

const LogoDiv = styled(NavLink)`
    padding: 25px 40px;
    text-decoration: none;
    cursor: nw-resize;
`;

const CatalogueDiv = styled(NavLink)`
    padding: 25px 20px;
    text-decoration: none;
    cursor: ne-resize;
`;

const SpectaclesDiv = styled(NavLink)`
    padding: 25px 40px;
    margin-bottom: 4px;
    text-decoration: none;
    cursor: ne-resize;
`;

export default NavBar;