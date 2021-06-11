import React from 'react';
import styled, {css} from 'styled-components';
const {useState, useEffect} = React;
import { useGlobalContext } from '../../context/mainContext';
import './alert.css';
import moment from 'moment';
// firebase imports
import {TodoDataBase} from '../../context/Firebase';
import firebase from 'firebase';

const AlertButtons = styled.div `
    display:flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 15px;
`

// custom alert component to render it across whenever its needed
const Alert = ({todoValue, emptyInputs, dateVal, timeVal}) =>{
const {closeTodoBox, closeAlert, displayAlert} = useGlobalContext();

// add alert 
const addAlert = ()=>{
    closeTodoBox();
    closeAlert();
    // adding data to firebase
    const {title, details, category} = todoValue;
    TodoDataBase.collection('Tasks').add({
        title: title,
        details: details,
        projectName: category,
        date: moment(dateVal).format('MM/DD/YYYY'),
        time: moment(timeVal).format('hh:mm A'),
        completed: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    emptyInputs();
    }

    return(
        <section className={`${displayAlert ? 'alert-container show': 'alert-container'}`}>
            <div className = 'alert-wrapper'>
                <p className='alert-title'>Confirm Item</p>
                <AlertButtons>
                    <button className='alert-cancel' onClick={closeAlert}>Cancel</button>
                    <button className='alert-add' onClick={addAlert}>AddTodo</button>
                </AlertButtons>     
            </div>
        </section>
    )
}

export default Alert;
