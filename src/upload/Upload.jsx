import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import Image from 'material-ui-image';
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
  
    },
    main:{
        background:'white',
        position:'relative',
        top:'70px',
        width:'50%',
        minHeight: '400px',
        justifyContent:'center',
        alignItems:'center'
    },
    imageInput:{
        display: 'none',
    },
    icon:{
        color:'#d299c2'
    },
    image:{
        width:'95%',
    }
}));

const Upload = () =>{
    const [url,setUrl] = useState(null);
    const classes = useStyles();
    const fileUploadHandler = (event) =>{
        const tempUrl = URL.createObjectURL(event.target.files[0]);
        console.log(tempUrl);
        setUrl(tempUrl);
    }
    return(
        <>
        <div className={classes.root}>
            <div className={classes.main}>
                <Button variant="contained" component="label">
                    <PhotoLibraryIcon className={classes.icon}/>
                    Upload File
                    <input type="file" accept="image/*" className={classes.imageInput} onChange={fileUploadHandler}/>
                </Button>
                <Button variant="contained" component="label">
                    Upload
                </Button>
               {url?
               <div className={classes.image}>
                   <Image src={url} imageStyle={{ width: '90%', maxHeight: '50%' }}  alt="image"/>
               </div>:null}
            </div>
            
        </div>
        </>
    );
}

export default Upload;