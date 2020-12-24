import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import {NavLink} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    dropdownMenu:{
        background:'white',
        zIndex:'100',
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
        flexDirection:'column',
        maxHeight: '300px',
        overflowY: 'auto',
    },
    li:{
        display:'flex',
    },    
    lis:{
        display:'flex',
        background:'#E8E8E8'
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
    heading:{
        textTransform: 'uppercase',
        textAlign:'center',
        fontWeight:'bold'
    },
    loader:{
        display:'flex',
        justifyContent:'center',
        width:'100px',
        height:'45px',
    }
}));
const Dropdown = (props)=>{
    const classes = useStyles();
    const [list,setList] = useState([]);
useEffect(()=>{
    Axios.post(process.env.REACT_APP_SERVER_URL+'/mentor/list/',{id:props.id,type:props.type}).then(response=>{
        switch(response.status){
            case 200:
                setList(response.data);
                break;
        }
    });
},[]);
    return(
        <>
        <ul className={classes.dropdownMenu} style={{right:props.type=='mentors'?'0px':''}}>
            <li className={classes.heading}>{props.type} <hr/></li>
           {list.length? list.map((value,index)=>
           <li className={index%2==0?classes.li:classes.lis} key={index}>
            <NavLink className={classes.navLink} to={value.uid}>
             <Avatar className={classes.avatar} src={process.env.REACT_APP_SERVER_URL+'/profile/'+value.avatar}/> {value.name}
             </NavLink>
            </li>
           ):<li className={classes.loader}><CircularProgress/></li>}
        </ul>
        </>
    )
}

export default Dropdown;