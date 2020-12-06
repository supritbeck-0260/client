import React, { useEffect, useState } from 'react';
import Grid from './Grid';
import ImageGridList from './ImageGridList';
import Axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';

const ProfilePage = (props)=>{
    const location = useLocation();
    const {id} = useParams();
    const [images,setImages] = useState(null);
    const userPictures = ()=>{
        Axios.post('http://localhost:5000/profile/images',{id:id}).then(response=>{
            setImages(response.data);
            props.getFun(0);
        });
    }
useEffect(()=>{
    userPictures();
},[location]);
    return(
        <>
        <Grid/>
        <hr/>
        <ImageGridList getFun={props.getFun} images={images}/>
        </>
    );
}

export default ProfilePage;