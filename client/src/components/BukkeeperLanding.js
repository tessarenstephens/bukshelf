import React, { useEffect, useContext } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, NavLink } from "react-router-dom";
import styled from 'styled-components';
import LoadingState from './LoadingState';
import bookShelf from '../assets/bookShelf.jpg';
import profileIcon from '../assets/Spectacles-Icon.png';
import Spectacles from "./SpectaclesIcon.js";
import BuksIcon from './BuksIcon.js';
import { UserContext } from './UserContext';


const BukkeeperLanding = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth0();
    const { loggedInUser } = useContext(UserContext);

    return (
        <>
        {!user || !loggedInUser ? (
            <LoadingState />
        ) : (
        <Container>
            <BukkeeperDiv>
                <Hey>Hey, búkkeeper!</Hey>
                <ProfileImage src={profileIcon} alt="profile icon"/>
                <Hey>{loggedInUser.fullName}</Hey>
                <p>{loggedInUser.userName}</p>
                <p>{loggedInUser.email}</p>
            </BukkeeperDiv>
            <NavWrapper>
                <CatalogueDiv to="/catalogue">
                    <BuksIcon /><NavText>catalogue</NavText>
                </CatalogueDiv>
                <ProfileDiv to="/profile">
                    <Spectacles /><NavText>profile</NavText>
                </ProfileDiv>
            </NavWrapper>
            <Div src={`${bookShelf}`}/>
            <ButtonWrapper>
                    <Button onClick={() => logout()}>
                        <ButtonText>logout</ButtonText>
                    </Button>
            </ButtonWrapper>
        </Container>
        )}
        </>
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

const BukkeeperDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 50%;
    padding: 20px;
    margin-top: 50px;
`;

const ProfileImage = styled.img`
    width: 200px;
    height: 200px;
`;

const Hey = styled.h1`
    margin: 15px;
`;

const NavWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: black;
    margin-top: 50px;
`;

const CatalogueDiv = styled(NavLink)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 140px;
    background-color: transparent;
    text-decoration: none;
    cursor: ne-resize;
    &:hover {
        scale: 1.2;
    }
`;

const ProfileDiv = styled(NavLink)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 140px;
    margin-top: 12.5px;
    background-color: transparent;
    text-decoration: none;
    cursor: ne-resize;
    &:hover {
        scale: 1.2;
    }
`;

const NavText = styled.div`
    margin: 10px;
    text-transform: uppercase;
    font-weight: bolder;
    text-align: center;
    font-size: 10pt;
    color: var(--paper)
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 110px;
    background-color: black;
`;

const Button = styled.button`
    width: 300px;
    height: 110px;
    background-color: transparent;
`;

const ButtonText = styled.div`
    color: var(--paper);
    cursor: pointer;
`;
export default BukkeeperLanding;