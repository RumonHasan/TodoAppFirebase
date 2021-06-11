import React, {useState, useEffect} from 'react';

// loader imports
import ClipLoader from 'react-spinners/ClipLoader';
import { css }  from '@emotion/core';
import styled from 'styled-components';

// components
import Navbar from '../Navbar/Navbar';
import TodoPage from '../Todo/TodoPage';
import AddTodo from '../Todo/AddTodo';
import Sidebar from '../Sidebar/Sidebar';
import AllTasks from '../AllTasks/AllTasks';
import EditProjectName from '../EditPopUps/EditProjectName';

// style
import style_main from './style_main.css';

const App = () => {
    // loader animation
    const [isMainLoader, setIsMainLoader] = useState(false);

    useEffect(()=>{
        setIsMainLoader(true)
        setTimeout(()=>{
            setIsMainLoader(false)
        }, 2000)
    },[])

    // custom css
    const override = css`

    `;

    // loader animation 
    // if(isMainLoader){
    //     return(
    //         <div className='main-loader'>
    //             <div className='loader'>
    //                 <ClipLoader
    //                     css={override}
    //                     size={60}
    //                     color={'blue'}
    //                     loading={isMainLoader}
    //                 />
    //             </div>
    //         </div>
    //     )
    // }

    return (
            <main>
                <Navbar/>
                <AddTodo/>
                <Sidebar/>
                <EditProjectName/>
                <TodoPage/>
                <AllTasks/>
            </main>
    )
}

export default App;
