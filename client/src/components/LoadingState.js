import styled from "styled-components";
import React from "react";
import logoB from '../assets/bukshelf-logo.png';


const LoadingState = () => {
    return (
    <Container>
        <Ripple className="ripple" key="ripple">
            <div></div>
            <div></div>
        </Ripple>
        <Img src={`${logoB}`}/>
    </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: var(--paper);
    width: 100vw;
    min-height: 100vh;
`;

const Img = styled.img`
    margin-left: 60px;
    width: 150px;
    height: auto;
    background-color: var(--paper);
`;

const Ripple = styled.div` 
    display: inline-block;
    position: relative;
    width: 5px;
    height: 5px;
div {
    position: absolute;
    border: 4px solid #000000;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
div:nth-child(2) {
animation-delay: -0.5s;
}
@keyframes lds-ripple {
0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
}
4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
}
5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
}
100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
}
}
`;


export default LoadingState;