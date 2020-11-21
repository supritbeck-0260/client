import React from 'react';
import TimeAgo from 'react-timeago';
const TimeStamp = (props) =>{

    return(
        <>
            <TimeAgo date={props.time}/>
        </>
    )
}

export default TimeStamp;