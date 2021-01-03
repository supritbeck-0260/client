import React, { useContext } from 'react';
import {AuthContex,ServicesContex} from '../App'
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import data from './InfoData';
import InputChips from './InputChips';
import MultiChips from './MultiChips';
import Axios from 'axios';
import { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLocation, useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dropdown from './dropdown/Dropdown';
const useStyles = makeStyles((theme) => ({
    text:{
        margin:'10px',
        fontWeight:'normal',
        display:'flex',
        flexWrap: 'wrap',
        alignItems:'center'
    },
    chip:{
        fontSize:'10px',
        // padding: '0px 7px',
    },
    chipInput:{
        minWidth:'10px',
        margin: '-3px 0px -3px 8px', 
    },
    head:{
        height:'50px',
        background:'#EAE6DA',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        padding:'0px 5px',
    },
    rateContainer:{
       display:'flex',
       alignItems:'center'
    },
    buttonsW:{
        margin:'0px 2px',
    },
    buttonsM:{
        margin:'0px 2px',
        fontSize:'12px',
        padding:'5px !important',
    },
    loader:{
        width:'100%',
        display:'flex',
        justifyContent:'center'
    },
    username:{
        margin:'5px',
        width:'fit-content'
    },
    mentor:{
        width:'fit-content',
        margin:'0px 5px',
        border:'0px solid silver',
        padding:'0px 5px',
        borderRadius:'15px',
    },
    mentorCont:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width:'fit-content',
        position:'relative',
        minWidth:'180px',
        margin:'0px',
        padding:'0px'
    },
    userCont:{
        display:'flex',
        flexWrap: 'wrap',
        alignItems:'center',
    },
    mentorBtn:{
        padding:'4px 7px',
        fontSize:'10px'
    },
    icons:{
        height:'19px !important',
        width:'19px !important'
    }
  }));
const Info = () =>{
    const [chipData,setChipData]= useState({
        camera:'',
        lenses:'',
        editing:'',
        others:'',
        about:''
    });
    const {id} = useParams();
    const matches = useMediaQuery('(min-width:600px)');
    const auth = useContext(AuthContex);
    const services = useContext(ServicesContex);
    const location = useLocation()
    const classes = useStyles();
    const [editFlag,setEditFlag] = useState(false);
    const [startedOn,setStartedOn] = useState(null);
    const [toggle,setToggle]=useState(true);
    const [name,setName] = useState(null);
    const [mentoring,setMentoring] = useState(null);
    const [mentors,setMentors] = useState(null);
    const [isMentor,setIsMentor] = useState(null);
    const [isAuth,setIsAuth] = useState(false);
    const [unfollow,setUnfollow] = useState(false);
    const [mentorFlag,setMentorFlag] = useState(false);
    const [dropdown,setDropdown] = useState(false);
    const [type,setType] = useState('');
    const [loading,setLoading] = useState(false);
    const [profileRate,setProfileRate] = useState(null);
    const [view,setView] = useState({});
    const infoFun = ()=>{
        setToggle(false); 
        Axios.post(process.env.REACT_APP_SERVER_URL+'/profile/info/fetch',{id:id,myuid:auth.userID})
        .then(response=>
            {
                console.log(response);
                const value = response.data;
                setProfileRate(value.avgRate);
                if(value){
                    if(value.date){
                        const formattedDate = Intl.DateTimeFormat('en-US',{
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit' }).format(new Date(value.date));
                        setStartedOn(formattedDate);
                }
                setChipData({
                    camera:value.camera,
                    lenses:value.lenses,
                    editing:value.editing,
                    others:value.others,
                    about:value.about
                });
                setMentoring(value.mentoring);
                setMentors(value.mentors);
                if(value.isMentor){
                    setIsMentor(value.isMentor);
                }
                setName(value.name);
                setIsAuth(value._id==auth.userID);
                data[0].values = value.camera;
                data[1].values = value.lenses;
                data[2].values = value.editing;
                data[3].values = value.others; 
                }
              setEditFlag(false);
              setToggle(true);  
              setLoading(false);
            });
    }
    useEffect(()=>{
        setToggle(false);
        setDropdown(false)    
        infoFun();
    },[location]);
    const edit = ()=>{
        setEditFlag(true);
    }
    const save = () =>{
        setLoading(true);
        Axios.post(process.env.REACT_APP_SERVER_URL+'/profile/info/update',{...chipData,id:id},{
            headers:{
              'authorization': auth.token
            }
          })
          .then((res)=>{
              infoFun();
          })
          .catch(function (error) {
            console.log(error);
          });
          
    }
    const cancel = () =>{
        setEditFlag(false);
    }

const getValues= (key,value)=>{
    setChipData((prev)=>{
        prev[key]=value;
        return {...prev};
    });
}
const mentorReq = ()=>{
    setMentorFlag(true);
    Axios.post(process.env.REACT_APP_SERVER_URL+'/mentor/make',{id:id},{
        headers:{
          'authorization': auth.token
        }
      }).then(response=>{
          switch(response.status){
              case 200:
                services.socket.emit('SendData',id);
                  setIsMentor(true);
                  setUnfollow(false);
                  setMentoring(response.data.mentoring);
                  setMentorFlag(false);
                  break
          }
      });
}
const mentorRemove = ()=>{
    setUnfollow(true);
    Axios.post(process.env.REACT_APP_SERVER_URL+'/mentor/remove',{id:id},{
        headers:{
          'authorization': auth.token
        }
      }).then(response=>{
          console.log(response);
          switch(response.status){
              case 200:
                  setIsMentor(false);
                  setMentoring(response.data.mentoring);
                  break
          }
      });
}
const getList = (type)=>{
    setDropdown(true);
    setType(type);
}
const handleClickAway =()=>{
    setDropdown(false);
}
useEffect(()=>{
    if(matches) setView({head:'25px',buttons:classes.buttonsW,root:'0 20px',fonts:'',name:'',icon:'',star:''});
    else setView({head:'17px',buttons:classes.buttonsM,root:'0px',fonts:'10px',name:'25px',icon:classes.icons,star:'20px'});
},[matches]);
    return(
        <>
        <div className={classes.head}>
            <h2 style={{fontSize:view.head}}>{editFlag?'Edit Profile':
            <div className={classes.rateContainer}>Profile Rating: <Rating style={{fontSize:view.star}} name="read-only" precision={0.5} value={profileRate?profileRate.rate:0} readOnly /></div>}</h2>
            {isAuth?<div>
                {editFlag?<Button className={view.buttons} variant='outlined' color="primary" disable={loading} onClick={save}>{loading?'Saving...':'Save'}</Button>:null}
                {editFlag?<Button className={view.buttons} variant='outlined'  color="secondary" autoFocus onClick={cancel}>Cancel</Button>:null}
                {!editFlag?<Button variant='outlined' className={view.buttons} onClick={edit}>Edit<EditIcon/></Button>:null}
            </div>:
            auth.isLoggedin && toggle?
            isMentor?<Button disabled={unfollow} className={classes.mentorBtn} variant='outlined' onClick={mentorRemove}>{unfollow?'Unfollowing':'Unfollow'}</Button>:
            <Button onClick={mentorReq} className={classes.mentorBtn} variant='outlined' disabled={mentorFlag}>{mentorFlag?'Mentor Requsest':'Make Mentor'}</Button>
            :null}
        </div>
        <div style={{margin:view.root}}>
            <div className={classes.userCont}>
                <h1 className={classes.username} style={{font:view.name}}><strong>{name}</strong></h1>
                <ClickAwayListener onClickAway={handleClickAway}>
                <div className={classes.mentorCont}>
                    {mentoring!=null?<Button className={classes.mentor} style={{fontSize:view.fonts}} onClick={()=>getList('mentoring')}>Mentoring:{mentoring}</Button>:null}
                    {isAuth?<Button className={classes.mentor} style={{fontSize:view.fonts}} onClick={()=>getList('mentors')}>Mentors:{mentors}</Button>:null}
                    {dropdown?<Dropdown type={type} id={id}/>:null}
                </div>
                </ClickAwayListener>
            </div>

            {toggle?data.map((val,ind)=>
                <div className={classes.text} key={ind}>
                <Chip
                avatar={val.avt(view.icon)}
                className={view.chip} label={val.label} variant="outlined"/>: 
                {!editFlag?<MultiChips data={val.values}/>:<InputChips data={val.values} getFun={getValues} key={ind} variable={val.key} className={classes.chipInput}/>}
            </div>
            ):<div className={classes.loader}><CircularProgress color="secondary"/></div>}
            <hr></hr>
            <div className={classes.text}>About Me: {!editFlag?chipData.about:<TextField id="outlined-basic" value={chipData.about} onChange={(e)=>getValues('about',e.target.value)} variant="outlined" label="Write something" />}</div>
            <div className={classes.text}>Started On: {startedOn?startedOn:null}</div>
        </div>
        </>
    );
}
export default Info;