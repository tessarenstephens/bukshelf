import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import styled from'styled-components';
import Catalogue from './Catalogue';
import profileIcon from '../assets/spectacles-icon.png';
import LoadingState from './LoadingState';

const Profile = () => {
    const { loggedInUser } = useContext(UserContext);
    console.log(loggedInUser);
    return (
        <Container>
        { !loggedInUser && <LoadingState /> } 

        { loggedInUser && (
            <>
                <ProfileDiv>
                    <ProfileImage src={profileIcon} alt="profile icon"/>
                    <Hey>Hey, búkkeeper! {loggedInUser.fullName}</Hey>
                </ProfileDiv>

                <DashboardDiv>
                    <Catalogue/>
                </DashboardDiv>
                
            </>
        )}
        </Container>
    )
};

const Container = styled.div`
    width: 100%;
    height: 700px;
    background-color: var(--paper);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 50px;
`;

const DashboardDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const Hey = styled.h1`
    margin: 15px;
`;

const ProfileDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 50%;
    padding: 10px;
`;

const ProfileImage = styled.img`
    width: 200px;
    height: 200px;
`;

export default Profile;