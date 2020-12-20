import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width:'80%',
      margin:'6px auto'
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const Items = (props)=>{
    const classes = useStyles();
    const handleChange = (event) => {
        props.setData('item',event.target.value);
    };
    return(
        <>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Product</InputLabel>
            <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={props.value}
            onChange={handleChange}
            label="Product"
            >
                <MenuItem value='camera'>Camera</MenuItem>
                <MenuItem value='lenses'>Lense</MenuItem>
                <MenuItem value='editing'>Editing Tool</MenuItem>
                <MenuItem value='others'>Other Equipments</MenuItem>
            </Select>
      </FormControl>
        </>
    );
}

export default Items;