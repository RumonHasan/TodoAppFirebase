import React, {useState, useMemo, useCallback} from 'react';
import { useGlobalContext } from '../../context/mainContext';
import {FaTimes, FaPlus, FaCalendar} from 'react-icons/fa';
import './add.css';
import Alert from './AddAlert';

// date picker package import 
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme, MuiThemeProvider, unstable_createMuiStrictModeTheme} from '@material-ui/core/styles';

// firestore hook 
import useFirestore from '../../context/useFirestore';

// custom coloring 
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

const AddTodo = () => {
    const {todoDisplay, closeTodoBox, showAlert} = useGlobalContext();
    const {projects} = useFirestore();// main project list from firestore

    // storing the values of date and time picker
    const [dateVal, setDateVal] = useState(new Date());
    const [timeVal, setTimeVal] = useState(new Date());

    // storing the input values in temporary state object
    const [todoValue, setTodoValue] = useState({
        title: '',
        details: '',
        category: '',
        completed: false,
    });

    // storing the change of values
    const handleChangeTodo = (e)=>{
        const {name, value} = e.target;
        setTodoValue({ // updating the set state value 
            ...todoValue,
            [name]: value,
        })
    }
    const [defValue, setDefValue] = useState('selected');
    // Main Submit Handler function 
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(todoValue.title === '' || todoValue.details === '' || todoValue.category === '' || dateVal === '' || timeVal === ''){
           return;
        }else{
            showAlert();
        }
    }

    //empty inputs
    const emptyInputs = ()=>{
        setTodoValue({
            title: '',
            details: '',
            category: '',
        })
    }
    return (
        <section className={`${todoDisplay ? 'addtodo-wrapper show': 'addtodo-wrapper'}`} >
            <div className='addtodo-container'>
                <div className = 'addtodo-headers'>
                    <p className='addtodo-title'>Add A New Task</p>
                    <button className = 'close-todo-btn' onClick={closeTodoBox}><FaTimes className='close-icon'/></button>
                </div>
                <Alert todoValue={todoValue} dateVal={dateVal} timeVal={timeVal} emptyInputs={emptyInputs}/>

                <MuiThemeProvider theme={customTheme}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <form>
                        <input type='text' className='title' value={todoValue.title} name='title' placeholder='eg: Education, Sports ...' onChange={handleChangeTodo}></input>
                        <textarea type='text' className='details' value={todoValue.details} name='details' placeholder=' Description to your task..' onChange={handleChangeTodo}></textarea>
                        
                        <select id="categories" name="category" value={todoValue.category} onChange={handleChangeTodo}>
                            <option defaultValue={defValue}>Choose you project</option>
                            {projects.map((projectDropName)=>{
                                const {projectName, id} = projectDropName;
                                return(
                                    <option value={projectName}  key={id}>{projectName}</option>
                                )
                            })}
                        </select>
                    
                    <div className='date-picker'>
                        <DatePicker 
                            value={dateVal}
                            onChange={date=>setDateVal(date)} 
                            disablePast
                        />
                    </div>
               
                    <div className='time-picker'>
                         <TimePicker
                            value={timeVal}
                            onChange={time=>setTimeVal(time)}
                            disablePast
                        />
                    </div>

                
                    </form>
                    </MuiPickersUtilsProvider>
                </MuiThemeProvider>
                
                <button className='addtodo-btn' type='submit' onClick={handleSubmit}>Confirm</button>
                
            </div>
        </section>
    )
}

export default AddTodo;
