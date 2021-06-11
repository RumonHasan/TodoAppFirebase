import React, {useState, useRef, useEffect} from 'react'
import { useGlobalContext } from '../../context/mainContext';
import style from './style.css';
import useInterval from '../../context/useInterval';
import {FaTimes, FaBars, FaSearch} from 'react-icons/fa';

const Navbar = () => {
    const { menu, showTodoBox, showSidebar, closeSidebar, 
        icon, iconTimes, iconBars, closeProjectSubmenu, 
        currentUser, closeAddTaskProject } = useGlobalContext();
    // sidebar control 
    const handleSidebar = ()=>{
        showSidebar();
        iconTimes();
        closeAddTaskProject();
        // closing sidebar
        if(icon === false){
            iconBars();
            closeSidebar();
            closeProjectSubmenu();
        }
    }
    return (
    
        <section className = 'navbar-container' >
            <div className='navbar-section'>

                <div className='menu-bar'>
                    <a className='menu-icon' onClick={handleSidebar}>{icon ? <FaBars className='icon'/> : <FaTimes className='icon'/>}</a>
                    <div className='quick-search'>
                        <button className='search-btn' type='submit'><FaSearch className='search'/></button>
                        <input type='text' placeholder='quick find'></input>
                    </div>
                </div>

                <div className = 'menu-container'>
                    {/* menu items traversed */}
                    {menu.map((item, index)=>{
                        const { label, icon } = item;
                        const handleClick = ()=>{
                            if(label === 'Add Todo'){
                                showTodoBox();
                                closeAddTaskProject();
                                closeSidebar();
                                iconBars();
                            }
                        }
                        return(
                            <ul className='menu-items' key={index}>
                                <li className='item' onClick={handleClick}>{icon}</li>
                            </ul>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
export default Navbar;


// extras 
    // // retractable menu control
    // const [arrow, setArrow] = useState(false);
    // const handleArrow = ()=>{
    //     setArrow(!arrow);
    // }
    // // nav refs to act as marks
    // const navbarRef = useRef(null);
    // const navContainRef = useRef(null);

    // useEffect(()=>{ // using useEffect to produce a sideeffect retractable menu
    //     const navHeight = navbarRef.current.getBoundingClientRect().height;
    //     if(arrow){
    //         navContainRef.current.style.height= '0px';
    //     }else{
    //         navContainRef.current.style.height = `${navHeight + 30}px`
    //     }
    // });