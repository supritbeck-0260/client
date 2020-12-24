import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import {NavLink} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    dropdownMenu:{
        background:'white',
        zIndex:'1111',
        width:'fit-content',
        position:'absolute',
        border:'2px solid silver',
        padding:'0',
        margin:'0',
        listStyleType: "none",
        top: '30px',
        padding: '5px',
        borderRadius:'5px',
        display:'flex',
        justifyContent:'center',
        flexDirection:'column'
    },
    li:{
        display:'flex',
    },
    navLink:{
        textDecoration:'none',
        display:'flex',
        alignItems:'center',
        color:'black',
        width:'fit-content'
    },
    avatar:{
        width:'30px',
        height:'30px',
        margin:'0px 5px 5px 0px',
    },
}));
const Dropdown = (props)=>{
    const classes = useStyles();
    const [list,setList] = useState([]);
useEffect(()=>{
    Axios.post(process.env.REACT_APP_SERVER_URL+'/mentor/list/',{id:props.id,type:props.type}).then(response=>{
        console.log(response);
        switch(response.status){
            case 200:
                setList(response.data);
                break;
        }
    });
},[]);
    return(
        <>
        <ul className={classes.dropdownMenu}>
           {list.length? list.map((value,index)=>
           <li className={classes.li} key={index}>
            <NavLink className={classes.navLink} to={value.uid}>
             <Avatar className={classes.avatar} src={process.env.REACT_APP_SERVER_URL+'/profile/'+value.avatar}/> {value.name}
             </NavLink>
            </li>
           ):<CircularProgress/>}
        </ul>
        </>
    )
}

export default Dropdown;