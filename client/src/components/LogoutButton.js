import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import Spectacles from './SpecticlesIcon';



const LogoutButton = ({ loggedInUser }) => {
    const {logout } = useAuth0();
    return (
        <Container>
            <Copy>
                From graphic novels or zines to romance novels or textbooks, there can be a LOT of books to keep track of!
            </Copy>

            <Copy>
                Now, enter <CopyBold>búkshelf</CopyBold>. A digital space to support, share and catalogue our analogue obsession.
            </Copy>

            <Copy>So, <CopyBold>búkkeeper,</CopyBold> what are you cataloguing today?</Copy>
            <ButtonWrapper>
                <Button onClick={() => logout()}>
                    <Spectacles /><ButtonText>logout</ButtonText>
                </Button>
            </ButtonWrapper>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Copy = styled.p`
    width: 60%;
    margin-top: 50px;
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
    margin-top: 50px;
`;

const Button = styled.button`
    width: 300px;
    height: 55px;
    margin-top: -50px;
    border-radius: 3em;
    background-color: transparent;
    &:hover {
        scale: 1.2;
    }
`;

const ButtonText = styled.div`
    margin: 10px;
    color: var(--paper)
`;




export default LogoutButton;