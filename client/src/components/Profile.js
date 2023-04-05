import React from 'react';
import styled from'styled-components';
import { useAuth0 } from '@auth0/auth0-react';


const Profile = () => {
    const {user, isAuthenticated} = useAuth0();

    // GOOGLE SIGN IN OBJECT = 
    // given_name: Tessa Ren
    // family_name: Stephens
    // nickname: tessarenstephens
    // name: Tessa Ren Stephens
    // picture: https://lh3.googleusercontent.com/a/AGNmyxYCG0Xxl7zLBcfl9tTgkEgiNS2CGuqrWtJcWMXJHQ=s96-c
    // locale: en
    // updated_at: 2023-04-04T18:02:48.308Z
    // email: tessarenstephens@gmail.com
    // email_verified:
    // sub: google-oauth2|117867826610911657557

    return (
        isAuthenticated && (
            <>
            <Container>
                <Hey>Hey, búkkeeper!</Hey>
                {user?.picture && <ProfileImg src={user.picture} alt={user?.name} />}
                <h3>{user.given_name}</h3>
            </Container>
            </>
        )
    )
}

const Container = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
`;

const Hey = styled.h1`
    margin: 15px;
`;

const ProfileImg = styled.img`
    border-radius: 50%;
    padding: 10px;
`;



export default Profile;