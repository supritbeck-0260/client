import React from 'react';
import Chip from '@material-ui/core/Chip';
const MultiChips = (props)=>{
  const data = props.data;
    return(
        <>
        {data?data.map((val,ind)=>
        <Chip key={ind} label={val} variant="outlined" />
        ):null}
        </>
    )
}
export default MultiChips;
