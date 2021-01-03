import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth:120,
      margin:'6px'
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
const SelectBox = (props) => {
    const classes= useStyles();
    return (
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Search By</InputLabel>
            <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            onChange={(e)=>props.getValues('category',e.target.value)}
            value={props.value}
            label="Category"
            >
                <MenuItem value='camera'>Camera</MenuItem>
                <MenuItem value='lenses'>Lens</MenuItem>
                <MenuItem value='editing'>Editing Tool</MenuItem>
                <MenuItem value='others'>Other</MenuItem>
                <MenuItem value='location'>Location</MenuItem>
                <MenuItem value='photographer'>Photographer</MenuItem>
            </Select>
      </FormControl>
    );
};

export default SelectBox;