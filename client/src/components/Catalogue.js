import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from './UserContext';

const Catalogue = () => {
    const { loggedInUser } = useContext(UserContext);

    return (

        <Container>
            <h1>{loggedInUser.fullName}</h1>
            <p>{loggedInUser.buks.map((buk) => {
                return (
                    <div key={`buk-${buk.title}`}>
                        TITLE:{buk.title}  AUTHOR:{buk.author}
                    </div>
                )
            })}</p>
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