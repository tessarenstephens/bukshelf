import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import logoB from '../assets/bukshelf-logo.png';
import buksIcon from '../assets/buks-noline.png';
import Spectacles from './SpecticlesIcon';
import Loading from './LoadingState';

const Registration = () => {
    const navigate = useNavigate();

    const { user, isAuthenticated, isLoading, error } = useAuth0();
    const [formReceived, setFormReceived] = useState(false);
    const [formResult, setFormResult] = useState({
        preferredName: "",
        userName: "",
        email: "",
        location: "",
        bio: "",
        buks: [],
    });

    const [buk, setBuk] = useState({
        title: "",
        author: "",
        genre: "",
        condition: "",
        type: "",
        notes: "",
    })


    const handleRegistration = (event) => {
        event.preventDefault();
        console.log({...formResult, buks:[buk]})
        fetch("/add-bukkeeper", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( {...formResult, buks:[buk]} )
        }) .then((response) => response.json())
        .then((data) => {
            if (data.status === 201) {
                console.log(data);
                setFormReceived(true);
                setFormResult({ ...formResult});
                navigate('/bukshelf/catalogue');
            }
        })}

    const handleFormChange = (event) => {
        const { name } = event.target;
        if (name === 'preferredName') {
            setFormResult({ ...formResult, preferredName: event.target.value })
        } else if (name === 'email') {
            setFormResult({ ...formResult, email: event.target.value })
        } else if (name === 'userName') {
            setFormResult({ ...formResult, userName: event.target.value })
        } else if (name === 'bio') {
            setFormResult({ ...formResult, bio: event.target.value })
        } else if (name === 'location') {
            setFormResult({ ...formResult, location: event.target.value })
        } else if (name === 'title') {
            setBuk({...buk, title: event.target.value})
        } else if (name === 'author') {
            setBuk({...buk, author: event.target.value})
        } else if (name === 'genre') {
            setBuk({...buk, genre: event.target.value})
        } else if (name === 'type') {
            setBuk({...buk, type: event.target.value})
        } else if (name === 'condition') {
            setBuk({...buk, condition: event.target.value})
        } else if (name === 'notes') {
            setBuk({...buk, notes: event.target.value})
        }
    }


    return (
        <>
        {!isAuthenticated ? <h1>Loading...</h1> : (

        <Container>

            <Header>Hey, future búkkeeper! <SizeDiv><Spectacles /></SizeDiv></Header>
            <Copy>You're almost there...</Copy>
            <Copy>just complete our short registration form to get cataloguing.</Copy>
            <RegistrationForm>
                <InputWrapper>

                    <InputDiv>
                        <Label>first name</Label>
                        <Description></Description>
                        <InputField type="text" name="firstName" placeholder="tessa ren" onChange={(event) => handleFormChange(event)} required={true}></InputField>
                    </InputDiv>

                    <InputDiv>
                        <Label>email</Label>
                        <Description></Description>
                        <InputField type="text" name="email" placeholder="t-rex@bukkeeper.ca" onChange={(event) => handleFormChange(event)} required={true}></InputField>
                    </InputDiv>

                    <InputDiv>
                        <Label>búkkeeper username</Label>
                        <Description></Description>
                        <InputField type="text" name="userName" placeholder="t-rex" onChange={(event) => handleFormChange(event)} required={true}></InputField>
                    </InputDiv>

                    <InputDiv>
                        <Label>búkkeeper Bio</Label>
                        <InputBio type="textarea" name="bio" placeholder="What makes you, you? (don't worry, answering this isn't mandatory)" onChange={(event) => handleFormChange(event)} required={false}></InputBio>
                    </InputDiv>

                    <InputDiv>
                        <Label>Location</Label>
                        <InputField type="text" name="location" placeholder="Toronto, ON" onChange={(event) => handleFormChange(event)} required={true}></InputField>
                    </InputDiv>

                    <InputDiv>
                        <Label>What búk are you currently reading?</Label>
                        <Label2>Title</Label2>
                        <InputField type="text" name="title" placeholder="Zen and the Art of Motorcycle Maintenance" onChange={(event) => handleFormChange(event)} required={true}></InputField>
                        <Label2>Author</Label2>
                        <InputField type="text" name="author" placeholder="Robert M. Pirsig" onChange={(event) => handleFormChange(event)} required={true}></InputField>
                        <Label2>Genre</Label2>
                        <InputField type="text" name="genre" placeholder="Philosophical Fiction, Autobiography" onChange={(event) => handleFormChange(event)} required={true}></InputField>
                        <Label2>Type</Label2>
                        <InputField type="text" name="type" placeholder="paperback novel" onChange={(event) => handleFormChange(event)} required={true}></InputField>
                        <Label2>Condition</Label2>
                        <InputField type="text" name="condition" placeholder="fairly delicate, but sturdy & deckle edged" onChange={(event) => handleFormChange(event)} required={true}></InputField>
                        <Label2>Thoughts</Label2>
                        <InputBio type="textarea" name="notes" placeholder="synopsys, reviews, opinions, ISBN, print year, publication year, general notes, or whatever your heart desires can go here!" onChange={(event) => handleFormChange(event)} required={false}></InputBio>
                    </InputDiv>
                    <Button onClick={(event) => {handleRegistration(event)}}><IMG src={`${buksIcon}`} /> Create catalogue</Button>
                </InputWrapper>
            </RegistrationForm>
            <Footer>
                <Img src={`${logoB}`}/>
            </Footer>
        </Container>
        )}
        </>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--paper);
    height: fit-content;
    width: 100%;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    margin: 2% 0%;
    padding: 1.5%;
    padding-left: 2%;
    width: 40%;
    min-width: 440px;
    font-size: 20pt;
    font-weight: bold;
    border-radius: 10px;
    background-color: black;
    color: var(--paper);
`;

// spectacles icon positioning
const SizeDiv = styled.div`
    padding-left: 10px;
    margin-bottom: -6px;
`;

const Copy = styled.p`
    padding: 5px 0px 0px;
    text-align: center;
    width: 40%;
    min-width: 440px;
`;

// FORM STYLING >>
const RegistrationForm = styled.div`
    display: flex;
    justify-content: center;
    width: 40%;
    min-width: 440px;
    padding: 10px 20px;
    margin-top: 1.25%;
    border: 3px solid black;
    border-radius: 10px;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const InputDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 98%;
`;

const Label = styled.label`
    font-weight: bolder;
    text-transform: uppercase;
    font-size: 11pt;
    padding: 15px 0px 0px 5px;
`;

const InputField = styled.input`
    padding: 8px;
    width: 100%;
    font-size: 12pt;
    transform: scaleY(.95);
    border: 2px solid var(--paper);
    border-radius: 9px;
    &:focus {
        outline: none;
        border: 2px solid black;
    }
    &:active {
        outline: none;
        border: 2px solid black;
    }
`;

const Description = styled.p`
    font-size: 9pt;
    font-style: italic;
`;

const InputBio = styled.textarea`
    padding: 8px;
    width: 100%;
    height: 150px;
    font-size: 12pt;
    font-family: var(--helvetica);
    border-radius: 9px;
    border: 2px solid var(--paper);
    &:focus {
        outline: none;
        border: 2px solid black;
    }
    &:active {
        outline: none;
        border: 2px solid black;
    }
`;

const Label2 = styled.label`
    font-weight: bolder;
    text-transform: uppercase;
    font-size: 9pt;
    padding: 5px 0px 0px 10px;
`;

const Button = styled.button`
    width: 100%;
    height: 50px;
    border-radius: 7px;
    margin: 20px 0px 15px;
    color: var(--paper);

`;

const IMG = styled.img`
    width: 18px;
    margin-bottom: -2px;
`;

// << FORM STYLING

const Footer = styled.div`
    height: 225px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 75px;
`;

const Img = styled.img`
    width: 150px;
    height: auto;
    background-color: var(--paper);
`;

export default Registration