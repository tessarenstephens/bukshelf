import React, { useContext } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from './UserContext';

const Catalogue = () => {
    const { user, isAuthenticated } = useAuth0();
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

    return (

        <Container>
            
            
        </Container>

    )
}
const Container = styled.div`
    width: 100%;
    background-color: var(--paper);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    border: solid 3px black;
    border-radius: 9px;
`;


export default Catalogue;