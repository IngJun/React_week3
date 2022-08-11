import React from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '../components/button/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NotFound = () => {
    const navigate = useNavigate();
    return ( 
        <div>
            Page Not Found
            <Button text={<ArrowBackIcon/>} action={()=>{navigate('/')}}/>
        </div>
     );
}

export default NotFound;