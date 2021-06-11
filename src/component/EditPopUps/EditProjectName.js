import React,{useState} from 'react'
import {useGlobalContext} from '../../context/mainContext';
import {TodoDataBase} from '../../context/Firebase';
import './projectRename.css';
import {FaTimes} from 'react-icons/fa';

const EditProjectName = () => {
    // project and Task ref
    const projectRef = TodoDataBase.collection('Projects');
    const taskRef = TodoDataBase.collection('Tasks');

    // global context 
    const {projectRenameBox, closeProjectRenameBox, oldProjectName, closeAllBeginTasks} = useGlobalContext();

    const [newProjectName, setNewProjectName] = useState('');
    // project rename function
    const projectRename = (oldProjectName, oldProjectId, newProjectName)=>{
        projectRef.doc(oldProjectId).update({projectName:newProjectName});
        taskRef.onSnapshot(snap=>{
                snap.docs.map(doc=>{
                    if(doc.data().projectName === oldProjectName){
                        doc.ref.update({projectName: newProjectName});
                    }
                })
            })
        closeAllBeginTasks();
    }

    // handle popup close
    const handleCloseRenameProject = (e)=>{
        e.preventDefault();
        closeProjectRenameBox();
    }

    // project rename submit handler 
    const handleRenameProject = (e) =>{
        e.preventDefault();
        projectRename(oldProjectName.name, oldProjectName.id, newProjectName)
        closeProjectRenameBox();
        setNewProjectName('');
    }

    
    return (
        <section className={`${projectRenameBox ? 'projectRenameBox-wrapper show': 'projectRenameBox-wrapper'}`}>
            <div className = 'projectRenameBox-container'>
                <div className = 'projectRenameBox-headers'>
                    <p>Project Rename</p>
                    <button className = 'projectRenameBox-close-btn' onClick={closeProjectRenameBox}><FaTimes/></button>
                </div>
                <div className = 'projectRenameBox-form-container'>
                    <form className='projectRename-form' >
                        <input type='text' className='projectRename-input' value={newProjectName} onChange={(e)=>(setNewProjectName(e.target.value))} placeholder={oldProjectName.name}></input>
                        <div className='projectRename-btns'>
                            <button className='projectRename' onClick={handleRenameProject}>Rename</button>
                            <button className='projectRename-cancel' onClick={handleCloseRenameProject}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default EditProjectName;
