import React from 'react';
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

const Gender = (props)=>{
    const classes = useStyles();
    const handleChange = (event) => {
        props.setData('gender',event.target.value);
    };
    return(
        <>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
            <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={props.values}
            onChange={handleChange}
            label="Gender"
            >
                <MenuItem value='M'>Male</MenuItem>
                <MenuItem value='F'>Female</MenuItem>
                <MenuItem value='O'>Other</MenuItem>
            </Select>
      </FormControl>
        </>
    );
}

export default Gender;