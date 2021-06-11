import {useState, useEffect} from 'react';
import {TodoDataBase} from '../context/Firebase';

const useSort = () => {

    // filtering projects
    const [project, setFilterLoading] = useState(false);
    const filteredProjects = (projectName, tasks) =>{
       let tempTasks = [...tasks];
       const filteredTasks = tempTasks.filter(task=> task.projectName === projectName)
       return filteredTasks;
    }
    return {filteredProjects};
}

export default useSort;
