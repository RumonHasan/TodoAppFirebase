import React, {useState} from 'react'
import './style.css';
import {FaTrash,FaEdit, FaTimes, FaCheck} from 'react-icons/fa';
import DeleteAlert from './Alerts/DeleteAlert';
import useFirestore from '../../context/useFirestore';
import {TodoDataBase} from '../../context/Firebase';
import {useGlobalContext} from '../../context/mainContext';

const TodoItem = ({id, title, details, projectName, date, time, completed}) => {
  const {deleteSingleTask} = useFirestore();
  const TaskRef = TodoDataBase.collection('Tasks');
  const {allTaskShow} = useGlobalContext(); // main global context

  // delete box state
  const [deleteBox, setDeleteBox] = useState({
    isOpen: false,
  })
  // delete single item
  const deleteThisItem = (id)=>{
    setDeleteBox({
      ...deleteBox,
      isOpen: false,
    })
    deleteSingleTask(id);
  }

  // handle todoselect 
  const handleTaskSelect = (id, completed)=>{
    TaskRef.doc(id).update({completed: !completed});
    // complete section gets hightlighted when clicked
  }

  //Display todoitem buttons 
  const [todoBtns, setTodoBtns] = useState(false);

  return (
  <>
  
      <div className={`todoitem-container ${completed ? 'highlight' : ''}`} onMouseEnter={()=>setTodoBtns(todoBtns => !todoBtns)} 
      onMouseLeave={()=>setTodoBtns(todoBtns => !todoBtns)}>
        <DeleteAlert deleteBox={deleteBox} setDeleteBox={setDeleteBox}/>
        <div className='todoitem-content'>

          <div className = 'todoitem-data'>
            <div className = 'todoitem-headers'>
              <button className='check-btn' 
              onClick={()=>handleTaskSelect(id, completed)}>{completed === true ? <FaCheck/> : undefined}</button>
              <p>{title}</p>
            </div>

            <div className = 'todoitem-project'>
              {allTaskShow === false && <p className='todoitem-projectname'>
                {projectName}
              </p>}
            </div>

          </div>

          <div className={`todo-item-btns ${todoBtns ? 'show' : ''}`}>
            <button className='delete-btn' onClick={()=>{setDeleteBox({
              isOpen: true,
              onConfirmDel: ()=>{deleteThisItem(id)} 
            })}}>
            <FaTrash className='delete-todo-icon'/></button>
            <button className='edit-btn'><FaEdit className='edit-todo-icon'/></button>
          </div>

        </div>
      </div>

  </>

  )
}
export default TodoItem;