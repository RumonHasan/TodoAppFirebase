import React, {useEffect} from 'react'
import { useGlobalContext } from '../../../context/mainContext';
import './styles/alert.css';

 const ProjectAlert = ({alertMessage}) => {
    const {projectAlert, closeProjectAlert} = useGlobalContext();// global context state
     useEffect(()=>{
         const alertState = setTimeout(()=>{
            closeProjectAlert()
         }, 2000)
         return(()=>{
             clearInterval(alertState)
         })
     },[projectAlert]);
     const {type, message} = alertMessage;
    return (
        <section className={`${projectAlert ? 'project-alert-container show' : 'project-alert-container'}`}>
            <div className='project-alert'>
                <p className={`project-alert-text ${type}`}>  
                    {message}
                </p>
            </div>
        </section>
    )
}

export default ProjectAlert;
