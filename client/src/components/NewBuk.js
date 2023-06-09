import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import logoB from '../assets/bukshelf-logo.png';
import BuksIcon from '../assets/buks-noline.png';
import Spectacles from './SpectaclesIcon';
import Books from '../assets/books-side.jpg';
import { GENRES } from '../constants';


const CreateNewBuk = () => {
    const navigate = useNavigate();
    const { user } = useAuth0();

    const [buk, setBuk] = useState({
        title: "",
        author: "",
        currentlyReading: true,
        genres: [],
        condition: "",
        type: "",
        notes: "",
    })

    const [genre, setGenre] = useState("")

    const handleFormChange = (event) => {
        const { name } = event.target;
        if (name === 'title') {
            setBuk({...buk, title: event.target.value })
        } else if (name === 'author') {
            setBuk({...buk, author: event.target.value })
        } else if (name === 'currentlyReading') {
            setBuk({...buk, currentlyReading: !buk.currentlyReading })
        } else if (name === 'genre') {
            setGenre( event.target.value )
        } else if (name === 'type') {
            setBuk({...buk, type: event.target.value })
        } else if (name === 'condition') {
            setBuk({...buk, condition: event.target.value })
        } else if (name === 'notes') {
            setBuk({...buk, notes: event.target.value })
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
        setBuk({...buk, genres:bukGenres})
    };


const handleAddBuk = (event) => {
    event.preventDefault();
    console.log({...buk});
    fetch(`/api/bukkeeper/buk/${user.email}`, { 
        method: "PATCH", 
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({...buk})
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("BUK FORM:", data)
            if (data.status === 201) {
                setBuk(data.data);
                navigate("/catalogue")
            }
    })
}

return (
    <Container>
        <Header>add a new búk to your búklist<SizeDiv><Spectacles /></SizeDiv></Header>

        <FormDiv>
            <FormColumn>
                <ImgBanner src= {Books}/>
                <InputDiv>
                    <Label>Are you currently reading this búk?</Label>
                    <input type="checkbox" name="currentlyReading" checked={buk.currentlyReading} onChange={handleFormChange} required={true}></input>

                    <Label2>Title</Label2>
                    <InputField type="text" name="title" placeholder="Oryx and Crake" onChange={handleFormChange} required={true}></InputField>
                    <Label2>Author</Label2>
                    <InputField type="text" name="author" placeholder="Margaret Atwood" onChange={handleFormChange} required={true}></InputField>
{/* GENRE CHECKBOXES */}
                    <fieldset>
                        <GenreLabel>Which genres does your búk belong to?</GenreLabel>
                        <GenreSelectDiv>
                            { GENRES.map((genre) => {
                                return (
                                    <div key={`genre-${genre}`}>
                                        <input type='checkbox' name={`genre-${genre}`} value={genre} onChange={handleGenreChange}/> 
                                        { genre }
                                    </div>
                                )
                            })}
                            <GenreTextInput type="text" name="genre" placeholder="another genre" onChange={handleGenreChange} required={false} />
                        </GenreSelectDiv>
                    </fieldset>

{/* CHANGE TO RADIO INPUTS - HARDCOVER : PAPERBACK */}
                        <Label2>Type</Label2>
                        <TypeDiv>
                            <InputField type="radio" id="hardcover" name="type" value="Hardcover" onClick={handleFormChange}></InputField>
                            <RadioLabel HTMLfor="hardcover">Hardcover</RadioLabel>
                        </TypeDiv>
                        <TypeDiv>
                            <InputField type="radio" id="paperback" name="type" value="Paperback" onClick={handleFormChange}></InputField>
                            <RadioLabel HTMLfor="paperback">Paperback</RadioLabel>
                        </TypeDiv> 

                    <Label2>Condition</Label2>
                    <InputField type="text" name="condition" placeholder="fairly delicate, but sturdy & deckle edged" onChange={handleFormChange} required={true}></InputField>
                    <Label2>Thoughts</Label2>
                    <InputTextArea type="textarea" name="notes" placeholder="synopsys, reviews, opinions, ISBN, print year, publication year, general notes, or whatever your heart desires can go here!" onChange={handleFormChange} required={false}></InputTextArea>
                </InputDiv>
                <Button onClick={handleAddBuk}><IMG src={`${BuksIcon}`} /> Create catalogue</Button>
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
padding: 10px 0px 0px 10px;
`;

const TypeDiv = styled.div`
display: flex;
align-items: center;
text-transform: uppercase;
font-size: 10pt;
padding-left: 15px;
`;

const RadioLabel = styled.label`
margin-bottom: -5px;
`;

const GenreLabel = styled.label`    
font-weight: bolder;
text-transform: uppercase;
font-size: 9pt;
padding: 5px 0px 0px 10px;
`;

const GenreSelectDiv = styled.div`
column-count: 2;
padding: 5px 0px 10px 15px;
text-transform: uppercase;
font-size: 10pt;
column-gap: 20px;
`;

const GenreTextInput = styled.input`
    text-transform: uppercase;
    font-size: 9pt;
    padding: 5px;
    width: 100%;
    margin-left: 18px;
`;

const Button = styled.button`
    width: 100%;
    height: 50px;
    border-radius: 7px;
    margin: 20px 0px 15px;
    color: var(--paper);
    cursor: se-resize;
`;

const IMG = styled.img`
    width: 18px;
    margin-bottom: -2px;
`;

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
export default CreateNewBuk;