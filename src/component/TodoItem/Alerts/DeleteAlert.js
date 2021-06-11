import React, {useState} from 'react'
import styled from 'styled-components';
import './delete.css';

const DeleteAlert = (props) => {
    const {deleteBox, setDeleteBox} = props;
    return (
        <section className={`${deleteBox.isOpen === true ? 'delete-container show' : 'delete-container' }`}>
            <div className='alert-wrapper'>
                <DeleteText>Confirm Delete Event</DeleteText>
            <div className='alert-btns'>
                <button className='delete-alert' onClick={deleteBox.onConfirmDel}>Delete</button>
                <button className='cancel-alert' onClick={()=> setDeleteBox({
                    ...deleteBox,
                    isOpen:false,
                })}>Cancel</button>
            </div>
            </div>
        </section>
    )
}

export default DeleteAlert;
// styled components 

const DeleteText = styled.p `
    font-size: 1.2rem;
    color: rgb(59, 59, 202);
`;
