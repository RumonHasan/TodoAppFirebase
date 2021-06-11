import React, {useState,useEffect} from 'react';
import { useGlobalContext } from '../../context/mainContext';
import './SidebarStyle.css';
import {FaPlus, FaBars, FaArrowDown, FaArrowRight, FaSort} from 'react-icons/fa'
import styled, {css} from 'styled-components';
import AddProjectBox from './SidebarParts/AddProjectBox';
import ProjectList from './SidebarParts/ProjectList';
import useFirestore from '../../context/useFirestore';

// styled components
const CreateBtnSpan = styled.span `
    font-size: 1rem;
    color: rgb(246, 244, 244);
    text-align: center;
    padding: 20px;
    font-family: 'Verdana, Geneva, Tahoma, sans-serif';
    font-weight: bold;
`;

const Sidebar = () =>{
    const {showTodoBox, sidebarDisplay, 
        showAllTasks, closeSidebar, 
        iconBars, openProjectBox, closeProjectSubmenu,
    } = useGlobalContext();
    const {projects} = useFirestore();
    const handleCreate = () =>{
        showTodoBox();
        closeSidebar();
        iconBars();
    }

    // expanding the menu
    const [arrow, setArrow] = useState(false);
    const [projectDrop, setProjectDrop] = useState(false);
    const expandDrop = ()=>{
        setArrow(prevArrow => !prevArrow);
        setProjectDrop(prevDrop => !prevDrop);
    }

    // Adding new project
    const addProject = ()=>{
        openProjectBox();
        closeProjectSubmenu();
    }

    // show all projects
    const showAllProjects = ()=>{
        showAllTasks();
    }

    return(
    <>
    <AddProjectBox setArrow={setArrow} setProjectDrop={setProjectDrop}/>
        <section className={`${sidebarDisplay ? 'sidebar-container active' : 'sidebar-container'}`}>
            <div className='sidebar-headers'>
                <a className='create-btn' onClick={handleCreate}><CreateBtnSpan>New Todo</CreateBtnSpan><FaPlus/></a>
                <div className='project-container'>
                    <div className='project-headers'>
                        <div className='project-btn' onClick={expandDrop}>
                            <button className='project-drop'>{arrow ? <FaArrowDown/> : <FaArrowRight/>}</button>
                            <a className='project-link'>Projects</a>
                        </div>
                        <div className='project-utilities'>
                            <button className='project-add' onClick={addProject}><FaPlus/></button>
                            <button className='project-all' onClick={showAllProjects}>All Tasks</button>
                        </div>    
                    </div>
                    { projects.length > 0 ? 
                    <div className={`${projectDrop ? 'project-dropdown show': 'project-dropdown'}`}>
                        <ProjectList/>
                    </div> : <p className='no-project-text'>You have no projects!</p>
                    }
                </div>
            </div>
        </section>
    </>
    )
}

export default Sidebar;

