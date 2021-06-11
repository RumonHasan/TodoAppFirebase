import React from 'react'
import { useGlobalContext } from '../../context/mainContext';
import todomark from '../Assets/images/todoDefault.png';
import styled, {css} from 'styled-components';

// component 
 const TodoWatermark = () => {
    return (
        <TodomarkContainer>
            <TodoWaterMark>
                <TodoImage src={todomark}/>
                <TodoText>Everything Looks Organized, Keep Up The Good Work</TodoText>
            </TodoWaterMark>
        </TodomarkContainer>
    )
}

// styled components
const TodomarkContainer = styled.div `
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    display: grid;
    place-items: center;
`;

const TodoWaterMark = styled.div `
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items:center;
`

const TodoImage = styled.img `
    width: 250px;
    height: 250px;
    opacity: 0.3;
    border-radius: 50%;

`;

const TodoText = styled.p `
    color: white;
    font-size: 1.1rem;
    font-family: 'Noto Sans, sans-serif';
    opacity: 0.8;
`;


export default TodoWatermark;
