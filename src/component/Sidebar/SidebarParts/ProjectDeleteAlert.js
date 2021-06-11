import React, {useState} from 'react';
import './styles/project-delete-alert.css';
import { useGlobalContext } from '../../../context/mainContext';
import {FaTrash, FaTrashAlt} from 'react-icons/fa';

 const ProjectDeleteAlert = ({deleteProjectState, setDeleteProjectState, submenuObject}) => {
    const [finalDeleteState, setFinalDeleteState] = useState({ // state created in order to execute the function from the main state subset function 
        deleteState: '',
        deleteThisProject: '',
    })
    const handleDeleteProject = ()=>{ // closing project delete alert state 
        setDeleteProjectState(prevState => !prevState);
    }
    return (
        <section className={`${deleteProjectState ? 'delete-project-box show': 'delete-project-box'}`}>
            <div className= 'delete-project-dialog'>
                <div className='delete-project-headers'>
                    <p className='delete-project-text'>Are you sure you want to delete the project and the tasks?</p>
                    <div className='delete-project-box-btns'>
                        <button className='delete-project' onClick={()=>{setFinalDeleteState({
                            ...finalDeleteState,
                            deleteState: handleDeleteProject(),
                            deleteThisProject: submenuObject.deleteProject(),
                        })}}><FaTrashAlt/></button>
                        <button className='cancel-delete' onClick={handleDeleteProject}>Cancel</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ProjectDeleteAlert;
