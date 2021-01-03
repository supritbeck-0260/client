import React from 'react';
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import LensOutlinedIcon from '@material-ui/icons/LensOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
  const data = [
    {
        avt:(value)=><CameraAltRoundedIcon className={value}/>,
        label:"Camera",
        key:'camera',
        placeholder:'Cameras you have..',
        tooltip:'Camera Collection',
        values:[]
           
    },
    {
        avt:(value)=><LensOutlinedIcon className={value}/>,
        label:"Lenses",
        key:'lenses',
        placeholder:'Lenses you have..',
        tooltip:'Lense Collection',
        values:[]
    },
    {
        avt:(value)=><EditOutlinedIcon className={value}/>,
        label:"Editing",
        key:'editing',
        placeholder:'Editing tools you use..',
        tooltip:'Editing Softwares',
        values:[]   
    },
    {
        avt:(value)=><LibraryAddOutlinedIcon className={value}/>,
        label:"Others",
        key:'others',
        placeholder:'Other equipments you have..',
        tooltip:'Other equipments Collection',
        values:[]  
    },
]
export default data;