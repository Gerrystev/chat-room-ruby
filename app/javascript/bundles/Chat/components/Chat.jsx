import React, { useState } from 'react';
import * as style from './Chat.module.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid'

import ChatRoomList from './ChatRoomList';
import ChatRoomWindow from './ChatRoomWindow';

const Chat = (props) => {
  const [focusChatroomId, setFocusChatroomId] = useState(props.name);

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Ruby Chatroom
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container marginTop={1} className={style.container}>
        <Grid item xs={3} className={style.listChatRooms}>
          <ChatRoomList setFocusChatroomId={setFocusChatroomId}/>
        </Grid>
        {/* Add button */}
        <ChatRoomWindow chatRoomId={focusChatroomId}/>
      </Grid>
    </>
  );
};

export default Chat;
