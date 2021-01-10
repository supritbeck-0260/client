import React, { useState,useEffect, useContext } from 'react';
import {AuthContex,ServicesContex} from '../App';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import Axios from 'axios';
import InputGroup from './InputGroup';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import data from './Data';
import CloseIcon from '@material-ui/icons/Close';
import FadeIn from 'react-fade-in';
import CameraMode from './CameraMode';
const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        top: '0',
        left: '0',
        width:'100%',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.6)',
        display:'flex',
        justifyContent:'center',
        zIndex:'1111',
        overflowY:'auto',
        overflowX:'hidden'
    },
    mainW:{
        background:'white',
        width:'40%',
        margin:'70px 0px',
        height:'fit-content', 
        borderRadius:'8px',
    },
    mainM:{
        background:'white',
        width:'100%',
        margin:'0px',
        minHeight:'100vh',
        height:'fit-content',
    },
    imageInput:{
        display: 'none',
    },
    icon:{
        color:'#d299c2',
    },
    imgCont:{
        width:'100%',
        display:'flex',
        justifyContent:'center',
    },
    header:{
        display:'flex',
        justifyContent:'center',
        margin: '11px',
    },
    mainTile:{
        display:'flex',
        width:'100%',
        justifyContent:'left',
        alignItems: 'center'
    },
    tile1:{
        width:'100px',
        height:'36px',
        background:'rgba(0,0,0,.03)',
        border: '1px solid rgba(0,0,0,.125)',
        display:'flex',
        justifyContent:'center',
        alignItems: 'center',
        margin:'10px',
        borderRadius:'5%'
    },
    tile2:{
        width:'60%;',
        height:'36px',
        display:'flex',
        alignItems: 'center'
    },
    textArea:{
        width:'100%'
    },
    submit:{
        width:'96%',
        height:'30px',
        color: '#fff',
        backgroundColor: '#337ab7',
        borderColor: '#2e6da4',
        borderRadius:'10px',  
    },
    submitDiv:{
        width:'100%',
        display:'flex',
        justifyContent:'center',
        margin:'5px 0px'
    },
    cancel:{
        position:'relative',
        float:'right',
        margin: '-10px 1px',
        minWidth:'20px',
    },
}));

const Upload = (props) =>{
    const matches = useMediaQuery('(min-width:600px)');
    const auth = useContext(AuthContex);
    const services = useContext(ServicesContex);
    const [file,setFile] = useState(null); 
    const [url,setUrl] = useState(null);
    const classes = useStyles();
    const [view,setView]=useState({});
    const [uploadBtn,setUploadBtn] = useState('Upload');
    const [photoInfo,setPhotoInfo] = useState({
        about:{},
        camera:{},
        lenses:{},
        editing:{},
        others:{},
        location:{},
        settings:{shutter:'',apprature:'',iso:'',focus:''}
    });
    
    const fileUploadHandler = (event) =>{
        const tempUrl = URL.createObjectURL(event.target.files[0]);
        setFile(event.target.files[0]);
        setUrl(tempUrl);
    }
const getValue = (target) =>{
setPhotoInfo((prev)=>{
    if(target.name == 'settings') prev[target.name]=target.value;
    else prev[target.name]={value:target.value};
    return {...prev};
});
}
const handleBlur = (name,data) => {
    setPhotoInfo((prev)=>{
        prev[name]={value:data.name,link:data.link};
        return {...prev};
    });
  };
const postData = (event) =>{
    setUploadBtn('Uploading...');
    const formData = new FormData();
    event.preventDefault();
    formData.append('file',file);
    formData.append('info',JSON.stringify(photoInfo));
    Axios.post(process.env.REACT_APP_SERVER_URL+'/upload',formData,{
        headers:{
          'authorization': auth.token
        }
      }).then(response=>{
          switch(response.status){
            case 200:
                setUploadBtn('Upload');
                props.toggleFun();
                services.updateContex(false,false,true);
                services.socket.emit('newupload','newupload')
                break;
            case 201:
                setUploadBtn('Upload');
                props.toggleFun();
                break;
          }
    });

}
  useEffect(()=>{
    if(matches) setView({main:classes.mainW,fonts:'',size:'medium',tile2:'19px 0',image:'350px',input:'56px',inheight:'25px',select:'20%',label:'10px'});
    else setView({main:classes.mainM,fonts:'10px',size:'small',tile2:'',image:'250px',input:'48px',inheight:'20px',select:'30%',label:'9px'});
  },[matches]);
    return(
        <>
        <div className={classes.root}>
            <div className={view.main}>
            <FadeIn>
            <Button color="secondary" className={classes.cancel} onClick={props.toggleFun}><CloseIcon /></Button>
                <h2 className={classes.header}>Upload Picture </h2>
                <hr/>
                <form onSubmit={postData}  encType="multipart/form-data">
                {!url?<div className={classes.mainTile}>
                        <div className={classes.tile1}> <label htmlFor="image">Image</label></div>
                        <div className={classes.tile2}> 
                            <Button variant="contained" component="label" >
                                    Choose photo
                                    <PhotoLibraryIcon className={classes.icon}/>
                                    <input type="file" accept="image/*" name="file" className={classes.imageInput} onChange={fileUploadHandler} required/>
                            </Button>
                            </div>  
                    </div>:null}
                    {url?
                    <div className={classes.imgCont}>
                        <Button variant='outlined' style={{padding:'0px 0px'}} component="label">
                        <img src={url} style={{maxHeight:view.image,maxWidth:'100%'}} alt="image"/>
                        <input type="file" accept="image/*" name="file" className={classes.imageInput} onChange={fileUploadHandler}/>
                        </Button>
                    </div>:null}
                    {url?
                    <div>
                    {data.map((val,index)=>
                        <InputGroup 
                        key={index}
                        styles={{fonts:view.fonts,size:view.size,tile2:view.tile2}}
                        name={val.name}
                        label={val.label}
                        value={photoInfo[val.name]}
                        id={val.id}
                        label2={val.label2}
                        placeholder={val.placeholder}
                        variant={val.variant}
                        change={getValue}
                        handleBlur={handleBlur}
                        />
                    )}
                    <CameraMode 
                    styles={{fonts:view.fonts,size:view.size,input:view.input,inheight:view.inheight,select:view.select,label:view.label}}
                    change={getValue}
                    value={photoInfo['settings']}
                    />
                    <div className={classes.submitDiv}>
                    <input variant="contained" type="submit" className={classes.submit} component="label" value={uploadBtn} disabled={uploadBtn==='Uploading...'}/>
                    </div>
                    </div>:null}
               </form>
               </FadeIn>
            </div>
        </div>
        </>
    );
}

export default Upload;