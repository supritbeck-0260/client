import React, { useEffect, useState } from 'react';
import Grid from './Grid';
import ImageGridList from './ImageGridList';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfilePage = (props)=>{
    const {id} = useParams();
    const [images,setImages] = useState(null);
    const userPictures = ()=>{
        Axios.post('http://localhost:5000/profile/images',{id:id}).then(response=>{
            setImages(response.data);
        });
    }
useEffect(()=>{
    userPictures();
},[]);
    return(
        <>
        <Grid/>
        <hr/>
        <ImageGridList getFun={props.getFun} images={images}/>
        </>
    );
}

export default ProfilePage;