import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';


const LogoutButton = () => {
    const {logout, isAuthenticated} = useAuth0();

    return (
        isAuthenticated && (
            <>
            <Button onClick={() => logout()}>Logout</Button>
            </>
        )
    )
}

const Button = styled.button`
    width: 100px;
    height: 45px;
`;


export default LogoutButton;