import React, { useState } from 'react';
import useFirestore from '../../../context/useFirestore';
import {TodoDataBase} from '../../../context/Firebase';
import {FaTrashAlt, FaEdit, FaArrowDown} from 'react-icons/fa';
import './styles/project-list.css';
import { useGlobalContext } from '../../../context/mainContext'; 
import ProjectSubmenu from './ProjectSubmenu';
import { colors } from '@material-ui/core';

const ProjectList = () => {
    const {openProjectSubmenu, closeProjectSubmenu,projectFilterObjects, setProjectFilter, closeAddTaskProject, showAllBeginTasks, closeAllBeginTasks} = useGlobalContext();
    const {projects, deleteSingleProject} = useFirestore();// getting the projects from firestore
    const projectRef = TodoDataBase.collection('Projects');
    // project arrown down submenu 
    const [submenuObject, setSubmenuObject] = useState({
        isOpen: '', //single object to control project deletion
    });

    // deleting a single project;
    const deleteThisProject = (projectId)=>{
        setSubmenuObject({
            ...submenuObject, // preserving old states
            isOpen: closeProjectSubmenu(),
        })
        deleteSingleProject(projectId, projectFilterObjects.name);
        setProjectFilter({
            ...projectFilterObjects,
            name: '',
        })
        closeAllBeginTasks();
    }

    // handle select project & filtered projects
    const handleSelectProject = (selected, id, projectName)=>{
        projectRef.doc(id).update({selected: !selected});
        setProjectFilter({
            ...projectFilterObjects,
            name: projectName,
            id: id,
        })
        showAllBeginTasks();
        closeAddTaskProject();
    }

    return (
    <>
      <ProjectSubmenu submenuObject={submenuObject} projectFilterObjects={projectFilterObjects}/>
        <div className='project-list-container'>
            {projects.map((project)=>{
                const {projectName, id, projectTimeStamp, selected} = project;
                    return(
                        <div className = 'project-list' key={id} onClick={()=>handleSelectProject(selected, id, projectName)}> 
                            <a className = 'project'>{projectName}</a>
                            <p className = 'project-timestamp'>{projectTimeStamp}</p>
                            <div className = 'project-list-btn'>
                                <button className = 'project-arrow-btn' onClick={()=>setSubmenuObject({
                                    ...submenuObject,
                                    iOpen: openProjectSubmenu(),
                                    deleteProject: ()=>{deleteThisProject(id)}
                                })}><FaArrowDown/></button>
                            </div>
                        </div>
                       
                    )
            })}
        </div>
    </>
    )
}

export default ProjectList;

