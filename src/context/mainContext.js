import React, {useEffect, useState, useContext, useReducer, createContext} from 'react';
import reducer from './reducer'; // main reducer
import { menuItem } from './menuItem';
import { auth } from "./Firebase";

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) =>{
    // user authentification
    // auth states
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
  
    const signup = (email, password) => {
      console.log("Signup being called");
      return auth.createUserWithEmailAndPassword(email, password)
    }
  
    const login = (email, password)=>{
      return auth.signInWithEmailAndPassword(email, password)
    }
  
    const logout= ()=>{
      return auth.signOut()
    }
  
    const resetPassword = (email)=> {
      return auth.sendPasswordResetEmail(email)
    }
  
    const updateEmail = (email)=>{
      return currentUser.updateEmail(email)
    }
  
    const updatePassword = (password)=> {
      return currentUser.updatePassword(password)
    }

    useEffect(() => { // setting the current user using Authstatechanged
        const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user)
          setLoading(false)
        })
        return unsubscribe
      }, [])

    // states
    const initialState = {
        menu: menuItem,
        todoDisplay: false,

        //all task state
        allTaskShow: false,

        //alert
        displayAlert: false,

        //sidebar
        sidebarDisplay: false,
        icon: true,
        showTasks: false,

        //projects
        showProjectBox: false,
        projectAlert: false,
        projectSubmenu: false,

        //project rename box state
        projectRenameBox: false,

        // add task project state
        addTaskProject: false,

    }

    // reducer
    const[state, dispatch] = useReducer(reducer, initialState);

    // state controls of UI Features 

    // alert state 
    const showAlert = ()=>{
        dispatch({type:'SHOW_ALERT'})
    }
    const closeAlert = ()=>{
        dispatch({type: 'CLOSE_ALERT'});
    }
    // add todo state
    const showTodoBox = ()=>{
        dispatch({type: 'SHOW_TODO'})
    }
    const closeTodoBox = ()=>{
        dispatch({type: 'CLOSE_TODO'})
    }

    // side bar state
    const showSidebar = ()=>{
        dispatch({type:'SHOW_SIDEBAR'});
    }
    const closeSidebar = ()=>{
        dispatch({type:'CLOSE_SIDEBAR'});
    }
    const iconTimes = ()=>{
        dispatch({type:'ICON_TIMES'});
    }
    const iconBars = ()=>{
        dispatch({type:'ICON_BARS'});
    }

    // projects states
    const openProjectBox = ()=>{
        dispatch({type:'SHOW_PROJECT_BOX'});
    }
    const closeProjectBox = ()=>{
        dispatch({type:'CLOSE_PROJECT_BOX'});
    }

    // project alert function
    const showProjectAlert = ()=>{
        dispatch({type:'SHOW_PROJECT_ALERT'})
    }
    const closeProjectAlert = ()=>{
        dispatch({type:'CLOSE_PROJECT_ALERT'})
    }

    //project submenu
    const openProjectSubmenu = ()=>{
        dispatch({type:'SHOW_PROJECT_SUBMENU'});
    }
    const closeProjectSubmenu = () =>{
        dispatch({type:'CLOSE_PROJECT_SUBMENU'});
    }

    /// show all tasks 
    const showAllTasks = ()=>{
        dispatch({type:'SHOW_ALL_TASKS'});
    }
    const closeAllTasks = ()=>{
        dispatch({type:'CLOSE_ALL_TASKS'});
    }
    // project filter objects 
    const [projectFilterObjects, setProjectFilter] = useState({
        name: '',
        id: ''
    })

    // add task project display
    const showAddTaskProject = ()=>{
        dispatch({type:'SHOW_ADD_TASK_PROJECT'});
    }
    const closeAddTaskProject = ()=>{
        dispatch({type:'CLOSE_ADD_TASK_PROJECT'});
    }

    // show all task at the beginning
    const showAllBeginTasks = ()=>{
        dispatch({type:'SHOW_ALL_BEGIN_TASKS'});
    }
    const closeAllBeginTasks = ()=>{
        dispatch({type:'CLOSE_ALL_BEGIN_TASKS'});
    }

    // projectName edit functions
    const [oldProjectName, setOldProjectName] = useState({
        name: '',
        id: ''
    });
    const showProjectRenameBox = (projectName, id)=>{
        setOldProjectName({
            ...oldProjectName,
            name: projectName,
            id: id
        });
        dispatch({type:'SHOW_PROJECT_RENAME'});
    }
    const closeProjectRenameBox = () =>{
        dispatch({type:'CLOSE_PROJECT_RENAME'});
    }

    return(
        <GlobalContext.Provider value={{
            ...state,
            //project filter objects
            projectFilterObjects,
            setProjectFilter,

            // show project add task
            showAddTaskProject,
            closeAddTaskProject,

            // show all begin tasks,
            showAllBeginTasks,
            closeAllBeginTasks,

            // show todobox
            showTodoBox,
            closeTodoBox,

            //alert
            showAlert,
            closeAlert,


            //sidebar
            showSidebar,
            closeSidebar,
            iconTimes,
            iconBars,

            //project box
            openProjectBox,
            closeProjectBox,

            // project alert
            showProjectAlert,
            closeProjectAlert,

            // show all tasks
            showAllTasks,
            closeAllTasks,

            //project submenu
            openProjectSubmenu,
            closeProjectSubmenu,

            //project rename box
            showProjectRenameBox,
            closeProjectRenameBox,
            oldProjectName,
            setOldProjectName,

            // current user states,
            currentUser,
            login,
            signup,
            logout,
            resetPassword,
            updateEmail,
            updatePassword,


        }}>
            {!loading && children}
        </GlobalContext.Provider>
    );

}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}


