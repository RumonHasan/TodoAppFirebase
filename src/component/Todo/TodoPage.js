import React, {useState} from 'react'
import { useGlobalContext } from '../../context/mainContext';
import TodoItem from '../TodoItem/TodoItem';
import style from './style.css';
import TodoWatermark from '../DefaultComponents/TodoWatermark';
import {FaPlus} from 'react-icons/fa';
// importing items from firestore
import useFirestore from '../../context/useFirestore';
import useSort from '../../context/useSort';
import {TodoDataBase} from '../../context/Firebase';
import firebase from 'firebase';

// date and time picker imports 
// date picker package import 
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme, MuiThemeProvider, unstable_createMuiStrictModeTheme} from '@material-ui/core/styles';
import moment from 'moment';

// custom coloring for date and time picker;
export const customTheme = createMuiTheme({
    overrides:{
        MuiPickersToolbar:{
            toolbar: {backgroundColor: '#00FF7F'},
        },
        MuiInputBase:{
             input: {
                 color: '#00FF7F',
                 fontWeight: 'bold',
                 fontSize: 15,
                 textAlign: 'center'
             }
            
        }
    },
})

const TodoPage = () => {
    const {tasks, projects} = useFirestore(); // getting the tasks from the firebase hook
    const { projectFilterObjects, addTaskProject, closeAddTaskProject, showAddTaskProject, allTaskShow, showProjectRenameBox} = useGlobalContext();
    const {filteredProjects} = useSort()
    const newTasks = filteredProjects(projectFilterObjects.name, tasks);
    const TaskRef = TodoDataBase.collection('Tasks'); // task database ref 

    // add project task states
    const [taskValue, setTaskValue] = useState({
        title: '',
        details: '',
        completed: false,
    });
    
    //set project state 
    const [addTaskProjectName, setAddTaskProjectName] = useState('');

    // storing the values of date and time picker
    const [dateVal, setDateVal] = useState(new Date());
    const [timeVal, setTimeVal] = useState(new Date());


    // storing the change of values
    const handleChangeTask = (e)=>{
        const {name, value} = e.target;
        setTaskValue({ // updating the set state value 
            ...taskValue,
            [name]: value,
        })
    }

    // empty tasks
    const emptyTaskInputs = ()=>{
        setTaskValue({
            title: '',
            details: '',
        })
    }
    
    // handle add
    const handleSubmitAddTask = (e)=>{  
        e.preventDefault();
        if(taskValue.title === '' || taskValue.details === '' || taskValue.category === '' || dateVal === '' || timeVal === ''){
            return;
         }
        if(allTaskShow === false){
            TaskRef.add({
                title: taskValue.title,
                details: taskValue.details,
                projectName: addTaskProjectName,
                date: moment(dateVal).format('MM/DD/YYYY'),
                time: moment(timeVal).format('hh:mm A'),
                completed: false,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        }else{
            TaskRef.add({
                title: taskValue.title,
                details: taskValue.details,
                projectName: projectFilterObjects.name,
                date: moment(dateVal).format('MM/DD/YYYY'),
                time: moment(timeVal).format('hh:mm A'),
                completed: false,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        }
        emptyTaskInputs();
        closeAddTaskProject();
    }
    
    return (
    <>
        {tasks.length > 0 ? <section className='todo-container'>
            <div className='todo-section'>
                <div className='todo-section-headers'>
                    {allTaskShow ? <p className='todo-project-title filtername' onClick={()=>showProjectRenameBox(projectFilterObjects.name, projectFilterObjects.id)}>
                    {projects.map(project=>{if(project.id === projectFilterObjects.id) return project.projectName })}</p> 
                    : <p className='todo-project-title'>All Tasks</p>}
                </div>
                <div className='todo-box'>
                    {allTaskShow === true ?
                        newTasks.map((item, index)=>{
                        return(
                            <TodoItem {...item} key={index}/>
                        )
                    })
                    : tasks.map((item, index)=>{
                        return(
                            <TodoItem {...item} key={index}/>
                        )
                    })}
                    
                    {addTaskProject === true ? 
                    <div className= 'add-task-input-container'>
                        <MuiThemeProvider theme={customTheme}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <>
                            <form>
                                <input type='text' className='add-task-title' value={taskValue.title} name='title' placeholder='eg: Education, Sports ...' onChange={handleChangeTask}></input>
                                <textarea type='text' className='add-task-details' value={taskValue.details} name='details' placeholder=' Description to your task..' onChange={handleChangeTask}></textarea>
                            </form>

                            <div className='add-task-date-picker'>
                            <DatePicker 
                                value={dateVal}
                                onChange={date=>setDateVal(date)} 
                                disablePast
                            />
                            </div>
                    
                            <div className='add-task-time-picker'>
                                <TimePicker
                                    value={timeVal}
                                    onChange={time=>setTimeVal(time)}
                                    disablePast
                                />
                            </div>

                            {allTaskShow === false &&     
                                <select name="category" className='select-projectname' value={addTaskProjectName} onChange={(e)=>setAddTaskProjectName(e.target.value)}>
                                    <option>Choose you project</option>
                                    {projects.map((projectDropName)=>{
                                        const {projectName, id} = projectDropName;
                                        return(
                                            <option value={projectName}  key={id}>{projectName}</option>
                                        )
                                    })}
                                </select>
                            }

                            <div className='task-btns'>
                                <button className='add-task-btn' type='submit' onClick={handleSubmitAddTask}>Confirm</button>
                                <button className='cancel-add-task-btn' onClick={closeAddTaskProject}>Cancel</button>
                            </div>
                            </>
                        </MuiPickersUtilsProvider>
                        </MuiThemeProvider>
            
                    </div>    

                    :<div className ='add-task-project' onClick={showAddTaskProject}>
                        <button className = 'add-task-project-btn' ><FaPlus/></button>
                        <p className='add-task-text'>Add Task</p>
                    </div>}
                </div>    
            </div>
        </section> :
        <TodoWatermark/>}
    </>
    );
}

export default TodoPage;
