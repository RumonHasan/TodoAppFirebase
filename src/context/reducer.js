const reducer = (state, action)=>{
    switch(action.type){
        // add alert state control
        case 'CLOSE_ALERT':
            return{
                ...state,
                displayAlert: false,
            }
        case 'SHOW_ALERT':
            return{
                ...state,
                displayAlert:true,
            }
        // sidebar states
        case 'SHOW_SIDEBAR':
            return{
                ...state,
                sidebarDisplay: true,
            }
        case 'CLOSE_SIDEBAR':
            return{
                ...state,
                sidebarDisplay: false,
            }
        case 'ICON_TIMES':
            return{
                ...state,
                icon: false,
            }
        case 'ICON_BARS':
            return{
                ...state,
                icon: true,
            }
        // todo box 
        case 'SHOW_TODO':
            return{
                ...state,
                todoDisplay: true,
            }
        case 'CLOSE_TODO':
            return{
                ...state,
                todoDisplay: false,
            }
        // project box display
        case 'SHOW_PROJECT_BOX':
            return{
                ...state,
                showProjectBox: true,
            }
        case 'CLOSE_PROJECT_BOX':
            return{
                ...state,
                showProjectBox: false,
            }
        // project alert
        case 'SHOW_PROJECT_ALERT':
            return{
                ...state,
                projectAlert: true,
            }
        case 'CLOSE_PROJECT_ALERT':
            return{
                ...state,
                projectAlert: false,
            }
        // show all tasks
        case 'SHOW_ALL_TASKS':
            return{
                ...state,
                showTasks: true,
            }
        case 'CLOSE_ALL_TASKS':
            return{
                ...state,
                showTasks: false,
            }
    
        // project submenu
        case 'SHOW_PROJECT_SUBMENU':
            return{
                ...state,
                projectSubmenu: true,
            }
        case 'CLOSE_PROJECT_SUBMENU':
            return{
                ...state,
                projectSubmenu: false,
            }
        // add task within project states
        case 'SHOW_ADD_TASK_PROJECT':
            return{
                ...state,
                addTaskProject: true,
            }
        case 'CLOSE_ADD_TASK_PROJECT':
            return{
                ...state,
                addTaskProject: false,
            }
        // show all begin tasks
        case 'SHOW_ALL_BEGIN_TASKS':
            return{
                ...state,
                allTaskShow: true,
            }
        case 'CLOSE_ALL_BEGIN_TASKS':
            return{
                ...state,
                allTaskShow: false,
            }
        // show projectrename box
        case 'SHOW_PROJECT_RENAME':
            return{
                ...state,
                projectRenameBox: true,

            }
        case 'CLOSE_PROJECT_RENAME':
            return{
                ...state,
                projectRenameBox:false,

            }
        default:
            return {...state}
    }
}

export default reducer;