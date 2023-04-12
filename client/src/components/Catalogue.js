import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from './UserContext';
import LoadingState from './LoadingState';

const Catalogue = () => {
    const { loggedInUser } = useContext(UserContext);
    return (
        <>
        {!loggedInUser && <LoadingState />}
        {loggedInUser && (
        <Container>
        <CopyBold>What are you cataloguing today?</CopyBold>
        <ListContainer>
            <Header>BÚKLIST</Header>

            {/* <button onClick={handleNewBuk}>New Búk</button> */}

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

const Header = styled.div`
    display: flex;
    text-transform: uppercase;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    background-color: black;
    color: var(--paper);
    width: 100%;
    height: 100px;
`;

const BuksContainer = styled.div`
    display: grid;
    padding: 15px;
`;

const BukContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: solid 3px black;
    border-radius: 9px;
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

export default Catalogue;