import React from 'react';
import socket from 'socket.io-client';

const connect = (uid)=>{
    const io = socket("http://localhost:5000");
    io.emit('online',uid);
    io.on(uid,data=>{
        console.log(data);
    });
}

export default connect;

