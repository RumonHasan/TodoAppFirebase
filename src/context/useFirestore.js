import {useState, useEffect, useCallback} from 'react'
import firebase from 'firebase';
import {TodoDataBase} from './Firebase';
import moment from 'moment';

const useFirestore = () => { 
    // retrieving data from the firestore 
    const [tasks, setTask] = useState([]);// state to store data
    const [isLoading, setLoading] = useState(false); // loading state to prevent memory leaks 
    const getItems = () =>{
        TodoDataBase.collection('Tasks').onSnapshot((querySnapshot)=>{
        setTask(querySnapshot.docs.map((item)=>({
            id:item.id,
            title: item.data().title,
            details: item.data().details,
            projectName: item.data().projectName,
            date: item.data().date,
            time: item.data().time,
            completed: item.data().completed,
        }))
        );
    });
    }
    useEffect(()=>{
        setLoading(true)
        getItems();
        // temporary cleanup function to prevent memory leakage
        return ()=> {
           setLoading(false);
        }
    },[])

    //getting projects from firestore 
    const [projects,setProjects] = useState([]);
    const [projectLoading, setProjectLoading] = useState(false);
    const getProjects = ()=>{
        TodoDataBase.collection('Projects').onSnapshot((querySnapshot)=>{
            setProjects(querySnapshot.docs.map((projectItem)=>({
                id: projectItem.id,
                projectName: projectItem.data().projectName,
                projectTimeStamp: moment(projectItem.data().rumonTime).format('MM/DD/YYYY'),
                selected: projectItem.data().selected,
            }))
        );
        });
    }
    useEffect(()=>{
        setProjectLoading(true);
        getProjects();
        return()=>{
            setProjectLoading(false);
        }
    },[])

    // deleting a single item
    const deleteSingleTask = (deleteId)=>{
        TodoDataBase.collection('Tasks').doc(deleteId).delete();
    }

    //deleting a single project along with all its tasks 
    const deleteSingleProject = (projectDeleteId, projectName) =>{
        console.log(projectName);
        TodoDataBase.collection('Projects').doc(projectDeleteId).delete();
        TodoDataBase.collection('Tasks').onSnapshot(snapShot=>{
            snapShot.docs.map(doc=>{
                if(doc.data().projectName === projectName){
                    doc.ref.delete();
                }
            })
        })
    }

    return {tasks, projects, deleteSingleTask, deleteSingleProject};
};
export default useFirestore;
