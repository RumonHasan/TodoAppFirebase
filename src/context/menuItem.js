import React from 'react';
import {FaHome, FaPhone, FaSignInAlt, FaPlus } from 'react-icons/fa';
import {Link, useHistory} from 'react-router-dom';
export const menuItem = [
    {
        label: 'Add Todo',
        icon: <FaPlus style={{color: '#00cc00'}} size={30}/>
    },
    {
        label: 'Home',
        icon: <Link to='/login'><FaHome style={{color: '#EA4C46'}} size={30}/></Link>
    },
    {
        label: 'Contact Us',
        icon: <FaPhone style={{color: '#2a9df4'}} size={30}/>
    },
    {
        label: 'Sign In',
        icon: <FaSignInAlt style={{color: 'ff9933'}} size={30}/>
    }
]   