import React, {useState, useCallback, useMemo} from 'react';
import { useGlobalContext } from '../../../context/mainContext';
import './styles/add-project.css';
import {FaTimes} from 'react-icons/fa';
import {TodoDataBase} from '../../../context/Firebase';
import 'firebase/firestore';
import ProjectAlert from './ProjectAlert';
import firebase from 'firebase'

const AddProjectBox = ({setArrow, setProjectDrop}) => {
    const {showProjectBox, closeProjectBox, showProjectAlert} = useGlobalContext();
    const [projectName, setProjectName] = useState('');
    // project alert states
    const [alertMessage, setMessageAlert] = useState({
        type:'',
        message:'',
    });

    const handleProjectForm = (e)=>{
        e.preventDefault();
        if(projectName === ''){
            return;
        }
        if(projectName){
            const projectRef = TodoDataBase.collection('Projects');
            projectRef.where('projectName', '==', projectName).get()
            .then(querySnapshot=>{
                if(querySnapshot.empty){ // checking whether the project with the same name is present or not
                    projectRef.add({
                        projectName: projectName,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        selected: false,
                    })
                    showProjectAlert();
                    setMessageAlert({
                        type: 'success',
                        message: 'Project has been added!'
                    })
                    setArrow(true);
                    setProjectDrop(true);
                }else{
                   setProjectName('');
                   showProjectAlert()
                   setMessageAlert({
                    type: 'danger',
                    message: 'Project is already present!'
                })
                }
            })
        }
        setProjectName('');
        closeProjectBox();
    }
    // getting the project name
    const handleProjectName = (e)=>{
        setProjectName(e.target.value)
    }

    const handleCloseProject = (e)=>{
        e.preventDefault();
        closeProjectBox();
        setProjectName('');
    }

    return (
    <><ProjectAlert alertMessage={alertMessage} setMessageAlert={setMessageAlert}/>
        <section className={`${showProjectBox ? 'add-project-container show': 'add-project-container'}`}>
            <div className='project-box'>
                <div className='project-box-headers'>
                    <p>Add New Project</p>
                    <button className='close-project-btn' onClick={closeProjectBox}><FaTimes/></button>
                </div>

                <form className='add-project-form' onSubmit={handleProjectForm}>
                    <input className='input-project-name' type='text' value={projectName} onChange={handleProjectName} placeholder='Enter a project name'></input>
                    <div className='add-project-btns'>
                        <button className='add-project-btn' type='submit'>Add New Project</button>
                        <button className='cancel-add-btn' onClick={handleCloseProject}>Cancel</button>
                    </div>
                </form>
                
            </div>              
        </section>
    </>
    )
}

export default AddProjectBox;
