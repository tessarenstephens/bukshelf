import React, { useContext } from 'react';
import styled from'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from './UserContext';
import Catalogue from './Catalogue';
import profileIcon from '../assets/spectacles-icon.png';
import LoadingState from './LoadingState';

const Profile = () => {
    const {user, isAuthenticated} = useAuth0();
    const {loggedInUser, setLoggedInUser} = useContext(UserContext);

    return (
        
        <UserContext.Provider value={loggedInUser}>
        <Container>
        {!loggedInUser.fullName && !isAuthenticated && <LoadingState />} 

        {loggedInUser && isAuthenticated && (
            <>
                <ProfileDiv>
                    <ProfileImage src={profileIcon} alt="profile icon"/>
                    <Hey>Hey, búkkeeper! {loggedInUser.fullName}</Hey>
                    <Hey>{loggedInUser.email}</Hey>
                </ProfileDiv>

                <DashboardDiv>
                    <Catalogue/>
                </DashboardDiv>
                
            </>
        )}
        </Container>
        </UserContext.Provider>
    )
}

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