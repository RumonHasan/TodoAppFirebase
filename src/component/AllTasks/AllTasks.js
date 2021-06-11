import React from 'react'
import { useGlobalContext } from '../../context/mainContext';
import './showTaskStyle.css';
import useFirestore from '../../context/useFirestore';
import {FaTimes} from 'react-icons/fa';

const AllTasks = () => {
    const {showTasks, closeAllTasks} = useGlobalContext();
    const {tasks} = useFirestore();
    return (
        <section className= {`${showTasks ? 'show-tasks-wrapper show': 'show-tasks-wrapper'}`}>
            <div className='show-tasks-container'>
                <div className='show-tasks-headers'>
                    <p className='all-task-text'>All Tasks: Quick View</p>
                    <button className='close-task-btn' onClick={closeAllTasks}><FaTimes/></button>
                </div>
                
                <div className='task-list'>
                    <div className='tasks'>
                        {tasks.map((task, index)=>{
                            const {projectName, title, details, id, date,time, completed} = task;
                            return(
                                <article key={id} className={`task ${completed ? 'highlight' : ''}`}>
                                    <div className='task-headers'>
                                        <p className='task-title'>{index + 1}) {title}</p>
                                        <div className='task-subheader'>
                                            <p className='task-project'>{projectName}</p>
                                            <p className='task-time-date'>{date} {time}</p>
                                        </div>                       
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AllTasks;