import React from 'react';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
const Suggestion = (props)=>{
    console.log(props);
    return(
        <>
        <Menu
            id="menu-list-grow"
            anchorEl={props.anchorEl}
            keepMounted
            open={Boolean(props.anchorEl)}
            onClose={props.handleClose}
            style={{ inset: '50px'}}
        >
        {Array.isArray(props.product)?
        props.product.map((value,index)=>
        <MenuItem key={index} onClick={props.handleClose}>
            <Typography>{value.name}</Typography>
        </MenuItem>
        ):null}

      </Menu>
        </>
    );
}

export default Suggestion;