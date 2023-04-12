import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from './UserContext';
import LoadingState from './LoadingState';
import { NavLink, useNavigate } from 'react-router-dom';

const Catalogue = () => {
    const { loggedInUser, buk } = useContext(UserContext);

    const navigate = useNavigate();

    const handleDeleteBuk = (event) => {
        event.preventDefault();
        const result = fetch(`/api/bukkeeper/${loggedInUser.email}/${buk}`, { method: 'DELETE', headers:{"Content-Type": "application/json"},
        body:JSON.stringify({...buk}) 
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("RESULT", result)
                if (data.status === 200) {
                    console.log(data);
                }
            })
            .catch((err) => console.log(err));       
    }

    return (
        <>
        {!loggedInUser && <LoadingState />}
        {loggedInUser && (
        <Container>
        <CopyBold>What are you cataloguing today?</CopyBold>
        <ListContainer>
            <Header>
                <Heading>BÚKLIST</Heading>
                <NewBukDiv to='/:bukkeeper/new-buk'>
                        <AddNew>add new búk</AddNew>
                </NewBukDiv>
            </Header>

            <div>{loggedInUser.buks.map((buk) => {
                return (
                    <BuksContainer key={`buk-${buk.title}`}>
                        <BukContainer>
                            <Label>Title</Label>
                            <BukDiv>
                                <BukTitle>{buk.title}</BukTitle>
                            </BukDiv>
                            <Label>Author</Label>
                            <BukDiv>
                                <BukDetails>{buk.author}</BukDetails>
                            </BukDiv>
                            <Label>Genres</Label>
                            <BukDiv>
                                <BukDetails>{buk.genres}</BukDetails>
                            </BukDiv>
                            <Label>Type</Label>
                            <BukDiv>
                                <BukDetails>{buk.type}</BukDetails>
                            </BukDiv>
                            <Label>Condition</Label>
                            <BukDiv>
                                <BukDetails>{buk.condition}</BukDetails>
                            </BukDiv>
                            <Label>Notes</Label>
                            <BukDiv>
                                <BukDetails>{buk.notes}</BukDetails>
                            </BukDiv>
                            <button onClick={handleDeleteBuk}>
                                <AddNew>remove búk from catalogue</AddNew>
                            </button>
                        </BukContainer>
                    </BuksContainer>
                )
            })}</div>
        </ListContainer>
        </Container>
        )}
        </>
    )
}
const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    height: fit-content;
    background-color: var(--paper);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CopyBold = styled.span`
    line-height: 1.4;
    font-weight: bold;
    font-size: 16pt;
    margin: 30px 0px 40px;
`;

const ListContainer = styled.div`
    width: 100%;
    background-color: var(--paper);
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid 3px black;
    border-radius: 9px;
`;

const Heading = styled.h1`
    color: var(--paper);
    margin-left: 40px;
`;

const AddNew = styled.h2`
    color: var(--paper);
    font-size: 10pt;
    cursor: ne-resize;
`;

const Header = styled.div`
    display: flex;
    text-transform: uppercase;
    justify-content: space-between;
    align-items: center;
    font-weight: bolder;
    background-color: black;
    color: var(--paper);
    width: 100%;
    height: 75px;
`;

const BuksContainer = styled.div`
    width: fit-content;
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
`;

const BukContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: solid 5px black;
    border-radius: 1em;
`;

const Label = styled.div`
    text-transform: uppercase;
    font-size: 10pt;
    font-weight: bolder;
    background-color: black;
    color: var(--paper);
    padding: 5px 10px;
    border: 2px solid black;
    border-radius: .4em;
    width: 100%;
`;

const BukDiv = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 9px;
    padding: 10px 15px;
`;

const BukTitle = styled.h2`
    text-transform: uppercase;

`;

const BukDetails = styled.div`
    display: flex;
    flex-direction: column;
    text-transform: uppercase;
`;

const NewBukDiv = styled(NavLink)`
    text-decoration: none;
`;

export default Catalogue;