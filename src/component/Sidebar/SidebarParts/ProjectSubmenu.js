import React, { useState } from 'react';
import { useGlobalContext } from '../../../context/mainContext';
import './styles/project-submenu.css';
import {FaTrashAlt, FaEdit, FaTimes} from 'react-icons/fa';
import ProjectDeleteAlert from './ProjectDeleteAlert';

const ProjectSubmenu = ({submenuObject, projectFilterObjects}) =>{
    const {projectSubmenu, closeProjectSubmenu, showProjectRenameBox} = useGlobalContext();

    // project delete alert dialogou box submenu 
    const [deleteProjectState, setDeleteProjectState] = useState(false);
    const openDeleteProjectAlert = ()=>{
        setDeleteProjectState(prevDeleteState => !prevDeleteState);
        closeProjectSubmenu();
    }

    //handle project Rename
    const handleProjectEdit = (e)=>{
        e.preventDefault();
        showProjectRenameBox(projectFilterObjects.name, projectFilterObjects.id);
        closeProjectSubmenu();
    }


    return(
    <>
    <ProjectDeleteAlert deleteProjectState={deleteProjectState} setDeleteProjectState={setDeleteProjectState} submenuObject={submenuObject}/>
        <section className={`${projectSubmenu ? 'project-submenu-container show': 'project-submenu-container'}`} >
            <div className='project-options'>
                <div className = 'project-submenu-headers'>
                    <p className='project-text'>Projects</p>
                    <button className='project-close-btn' onClick={closeProjectSubmenu} ><FaTimes/></button>
                </div>
                <div className='project-btns'>
                    <button className='delete-project-btn' onClick={openDeleteProjectAlert}>Delete Project<FaTrashAlt/></button>
                    <button className='edit-project-btn' onClick={handleProjectEdit}>Edit Project<FaEdit/></button>
                </div>
            </div>
        </section>
    </>
    )   
}

export default ProjectSubmenu;