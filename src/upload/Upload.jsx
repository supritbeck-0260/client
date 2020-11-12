import React, { useState,useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import Axios from 'axios';
import InputGroup from './InputGroup';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import data from './Data';
import CloseIcon from '@material-ui/icons/Close';
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
    mainLrg:{
        background:'white',
        width:'40%',
        margin:'70px 0px',
        height:'fit-content',
      
    },
    mainSml:{
     position:'relative',
      background:'rgb(255,255,255, 1)',
      height:'fit-content',
      margin:'3% 0',
    },
    imageInput:{
        display: 'none',
    },
    icon:{
        color:'#d299c2',
    },
    image:{
        width:'70%',
    },
    imgCont:{
        width:'100%',
        display:'flex',
        justifyContent:'center',
        margin:'10px 0px 10px 0px'
    },
    header:{
        display:'flex',
        justifyContent:'center'
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
        margin: '1px',
    }
}));

const Upload = (props) =>{
    const matches = useMediaQuery('(min-width:600px)');
    const [file,setFile] = useState(null); 
    const [url,setUrl] = useState(null);
    const classes = useStyles();
    const [mainCls,setMainCls] = useState(classes.mainLrg);
    const [uploadBtn,setUploadBtn] = useState('Upload');
    const [photoInfo,setPhotoInfo] = useState({
        about:'',
        camera:'',
        lenses:'',
        editing:'',
        others:''
    });
    
    const fileUploadHandler = (event) =>{
        const tempUrl = URL.createObjectURL(event.target.files[0]);
        setFile(event.target.files[0]);
        setUrl(tempUrl);
    }
const getValue = (target) =>{
      setPhotoInfo((prev)=>{
          prev[target.name]=target.value;
          return {...prev};
      });
}
const postData = (event) =>{
    setUploadBtn('Uploading...');
    const formData = new FormData();
    event.preventDefault();
    formData.append('file',file);
    formData.append('info',JSON.stringify(photoInfo));
    Axios.post('http://localhost:5000/upload',formData).then(response=>{
        if(response.status == '200'){
            props.getFun();
            props.toggleFun();
            setUploadBtn('Upload');
        }
    });

}
useEffect(()=>{
    if(matches){
        setMainCls(classes.mainLrg);
    }else{
        setMainCls(classes.mainSml);
    }
  },[matches]);
    return(
        <>
        <div className={classes.root}>
            <div className={mainCls}>
            <Button variant="contained" color="secondary" className={classes.cancel} onClick={props.toggleFun}><CloseIcon /></Button>
                <h2 className={classes.header}>Upload Image </h2>
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
                        <Button variant="contained" component="label">
                        <img src={url} className={classes.image} alt="image"/>
                        <input type="file" accept="image/*" name="file" className={classes.imageInput} onChange={fileUploadHandler}/>
                        </Button>
                    </div>:null}
                    {url?
                    <div>
                    {data.map((val,index)=>
                        <InputGroup 
                        key={index}
                        name={val.name}
                        label={val.label}
                        id={val.id}
                        label2={val.label2}
                        placeholder={val.placeholder}
                        variant={val.variant}
                        change={getValue}
                        />
                    )}
                    
                    <div className={classes.submitDiv}>
                    <input variant="contained" type="submit" className={classes.submit} component="label" value={uploadBtn} disabled={uploadBtn==='Uploading...'}/>
                    </div>
                    </div>:null}
               </form>
            </div>
        </div>
        </>
    );
}

export default Upload;