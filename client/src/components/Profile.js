import React, { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from './UserContext';
import styled from'styled-components';
import LoadingState from './LoadingState';
import profileIcon from '../assets/Spectacles-Icon.png';
import Books from '../assets/books-side.jpg';

const Profile = () => {
    const {logout } = useAuth0();
    const { loggedInUser } = useContext(UserContext);
    console.log("PROFILE LOGGEDINUSER:", loggedInUser);
    return (
        <>
        { !loggedInUser && <LoadingState /> } 
        { loggedInUser && (
            <Container>
                <ProfileImage src={profileIcon} alt="profile icon"/>
                <Header>Currently Reading</Header>
                <div>
                    {loggedInUser.buks.map(buk => {
                        if (buk.currentlyReading === true) {
                            return (
                                <CurrentBukDiv>
                                    <BukDetails>
                                        <CopyBold>{`${buk.title}`}</CopyBold>
                                    </BukDetails>
                                    <BukDetails>
                                        {`${buk.author}`}
                                    </BukDetails>
                                </CurrentBukDiv>
                            )
                        }
                    })}
                </div>
                <ImgBanner src= {Books}/>
                <Hey>{loggedInUser.fullName}</Hey>
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
    width: 100%;
    min-height: 100vh;
    height: fit-content;
    background-color: var(--paper);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ProfileImage = styled.img`
    width: 200px;
    height: 200px;
    margin: 30px;
`;

const Header = styled.div`
    margin: 15px;
    font-weight: bolder;
`;

const CurrentBukDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;

const BukDetails = styled.div`
    display: flex;
    text-transform: uppercase;
`;

const CopyBold = styled.span`
    line-height: 1.4;
    font-weight: bold;
    font-size: 16pt;
`;

const ImgBanner = styled.img`
    width: 100%;
    height: 550px;
    object-fit: cover;
    margin: 50px 0px 0px;
`;

const Hey = styled.h1`
    margin: 20px;
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
    cursor: sw-resize;
`;

const ButtonText = styled.div`
    color: var(--paper);
    cursor: sw-resize;
`;


export default Profile;