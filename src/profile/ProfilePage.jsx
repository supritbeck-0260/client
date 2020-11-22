import React from 'react';
import Grid from './Grid';
import ImageGridList from './ImageGridList';
const ProfilePage = (props)=>{
    return(
        <>
        <Grid/>
        <hr/>
        <ImageGridList getFun={props.getFun} images={props.images}/>
        </>
    );
}

export default ProfilePage;