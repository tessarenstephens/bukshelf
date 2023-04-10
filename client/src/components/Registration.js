import React from 'react';
import styled from 'styled-components';
import { useState } from'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import logoB from '../assets/bukshelf-logo.png';
import buksIcon from '../assets/buks-noline.png';
import Spectacles from './SpecticlesIcon';
import Books from '../assets/books-side.jpg';
import { GENRES } from '../constants';


const Registration = () => {
    const navigate = useNavigate();

    const { user, isAuthenticated } = useAuth0();
    const [formReceived, setFormReceived] = useState(false);

    const [formResult, setFormResult] = useState({
        fullName: "",
        email: "",
        buks: [],
    });

    const [buk, setBuk] = useState({
        title: "",
        author: "",
        currentlyReading: true,
        genres: [],
        condition: "",
        type: "",
        notes: "",
    })

    const handleFormChange = (event) => {
        const { name } = event.target;
        if (name === 'fullName') {
            setFormResult({ ...formResult, fullName: event.target.value })
        } else if (name === 'email') {
            setFormResult({ ...formResult, email: event.target.value })
        } else if (name === 'title') {
            setBuk({...buk, title: event.target.value})
        } else if (name === 'author') {
            setBuk({...buk, author: event.target.value})
        } else if (name === 'currentlyReading') {
            setBuk({...buk, currentlyReading: !buk.currentlyReading})

        } else if (name === 'genres') {
            console.log("HELLO GENRES")
            // setBuk({...buk, genre: event.target.value})

        } else if (name === 'type') {
            setBuk({...buk, type: event.target.value})
        } else if (name === 'condition') {
            setBuk({...buk, condition: event.target.value})
        } else if (name === 'notes') {
            setBuk({...buk, notes: event.target.value})
        }
    }

    // HANDLE GENRES OF CURRENT BUK
    const handleGenreChange = (event) => {
        const bukGenres = [...buk.genres];
        const { value, checked } = event.target;
        if ( checked ) {
            bukGenres.push(value);
        } else {
            const unChecked = bukGenres.findIndex((genre) => {
                return genre === value;
            }) 
            if (unChecked >= 0) {
            bukGenres.splice(unChecked, 1)
            }
        }
        setBuk({...buk, genres: bukGenres})
        console.log("BUKGENRES:", bukGenres);
    }


// SUBMIT REGISTRATION FORM
    const handleRegistration = (event) => {
        event.preventDefault();
        console.log({...formResult, buks:[buk]})

        fetch("/api/bukkeeper", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( {...formResult, buks:[buk]} )
        }) .then((response) => response.json())
        .then((data) => {
            if (data.status === 201) {
                setFormReceived(true);
                setFormResult({ ...formResult});
                navigate(`/profile`);
            }
    })}


    return (
        <Container>

            <Header>Hey, you're almost an official búkkeeper! <SizeDiv><Spectacles /></SizeDiv></Header>
            <Copy>You're almost there...</Copy>
            <Copy>just complete our short registration form to get cataloguing.</Copy>

            <FormDiv>
                <FormColumn>

                    <InputDiv>
                        <Label>full name</Label>
                        <Description></Description>
                        <InputField type="text" name="fullName" placeholder="Matilda Honey" onChange={(event) => handleFormChange(event)} required={true}></InputField>
                    </InputDiv>

                    <InputDiv>
                        <Label>email</Label>
                        <Description></Description>
                        <InputField type="text" name="email" placeholder="matilda_bookworm@bukshelf.ca" onChange={(event) => handleFormChange(event)} required={true}></InputField>
                    </InputDiv>

                    <ImgBanner src= {Books}/>

                    <InputDiv>
                        <Label>What búk are you currently reading?</Label>
                        <Label2>Title</Label2>
                        <InputField type="text" name="title" placeholder="Zen and the Art of Motorcycle Maintenance" onChange={handleFormChange} required={true}></InputField>
                        <Label2>Author</Label2>
                        <InputField type="text" name="author" placeholder="Robert M. Pirsig" onChange={handleFormChange} required={true}></InputField>
{/* CURRENTLY READING CHECKBOX */}
                        <Label2>Currently Reading</Label2>
                        <InputField type="checkbox" name="currentlyReading" checked={buk.currentlyReading} onChange={handleFormChange} required={true}></InputField>
{/* GENRE CHECKBOXES */}
                        <fieldset>
                            <legend>Select the genres apply to the buk you're currently reading.</legend>
                            { GENRES.map((genre) => {
                                return (
                                <div key={`genre-${genre}`}>
                                    <input type='checkbox' name={`genre-${genre}`} value={genre} onChange={handleGenreChange}/> 
                                    { genre }
                                </div>
                                )
                            })}
                        </fieldset>

                            {/* <Label2>Genre</Label2>
                            <InputField type="checkbox" name="genre" placeholder="Philosophical Fiction, Autobiography" onChange={(event) => handleFormChange(event)} required={true}></InputField> */}
{/* CHANGE TO RADIO INPUTS - HARDCOVER : PAPERBACK */}
                        <Label2>Type</Label2>
                        <InputField type="text" name="type" placeholder="paperback novel" onChange={(event) => handleFormChange(event)} required={true}></InputField>
                        <Label2>Condition</Label2>
                        <InputField type="text" name="condition" placeholder="fairly delicate, but sturdy & deckle edged" onChange={(event) => handleFormChange(event)} required={true}></InputField>
                        <Label2>Thoughts</Label2>
                        <InputTextArea type="textarea" name="notes" placeholder="synopsys, reviews, opinions, ISBN, print year, publication year, general notes, or whatever your heart desires can go here!" onChange={(event) => handleFormChange(event)} required={false}></InputTextArea>
                    </InputDiv>
                    <Button onClick={(event) => {handleRegistration(event)}}><IMG src={`${buksIcon}`} /> Create catalogue</Button>
                </FormColumn>
            </FormDiv>
            <Footer>
                <Img src={`${logoB}`}/>
            </Footer>
        </Container>
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
const FormDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 40%;
    min-width: 440px;
    margin-top: 1.25%;
    border: 3px solid black;
    border-radius: 10px;
`;

const FormColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 97%;
`;

const InputDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 97%;
`;

const Label = styled.label`
    font-weight: bolder;
    text-transform: uppercase;
    font-size: 11pt;
    padding: 15px 0px 0px 5px;
`;

const ImgBanner = styled.img`
    width: 99%;
    height: 75px;
    object-fit: cover;
    border-radius: 9px;
    margin: 10px 0px 0px 3px;
`;

const InputField = styled.input`
    padding: 8px;
    width: 100%;
    font-size: 12pt;
    transform: scaleY(.95);
`;

const Description = styled.p`
    font-size: 9pt;
    font-style: italic;
`;

const InputTextArea = styled.textarea`
    padding: 8px;
    width: 100%;
    height: 100px;
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