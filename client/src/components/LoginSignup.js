import React from 'react';
import styled from'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import Spectacles from './SpecticlesIcon';
import bookShelf from '../assets/bookShelf.jpg';


const LoginSignup = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();

    return (
        !isAuthenticated && (
            <Container>
                <Copy>
                    How many of us really know the complete inventory of our bookshelves? From genres, titles and authors to whether you’ve lent it out to a friend, there is a lot to keep track of. 
                </Copy>

                <Copy>
                    Now, enter <CopyBold>búkshelf</CopyBold>. A digital space to support and share an analogue obsession where búkkeepers have the ability to find, sort, share and monitor the status of any and all book collections.
                </Copy>
                <Copy>Become a <CopyBold>búkkeeper</CopyBold> & start cataloguing today!</Copy>
                <ButtonWrapper><Button onClick={() => loginWithRedirect()}><Spectacles /><Move>sign in or sign up</Move></Button></ButtonWrapper>
                <Div src={`${bookShelf}`}/>
            </Container>
        )
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 3%;
    width: 100%;
`;

const Copy = styled.p`
    width: 65%;
    margin: 2%;
    text-align: center;
    line-height: 1.4;
    font-size: 16pt;
`;

const CopyBold = styled.span`
    line-height: 1.4;
    font-weight: bold;
    font-size: 16pt;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 140px;
    background-color: black;
    margin-top: 2%;
`;

const Button = styled.button`
    width: 300px;
    height: 55px;
    margin-top: -20px;
    border-radius: 3em;
    background-color: transparent;
    &:hover {
        scale: 1.2;
    }
`;

const Move = styled.div`
    margin: 10px;
    color: var(--paper)
`;

const Div = styled.img`
    width: 100%;
    height: 450px;
    object-fit: cover;
`;

export default LoginSignup;