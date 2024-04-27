import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as style from './Chat.module.css';

import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { PlusOne } from '@mui/icons-material';

import ChatRoomList from './ChatRoomList';
import ChatRoomWindow from './ChatRoomWindow';

const Chat = (props) => {
  const [chatRoomName, setChatRoom] = useState(props.name);
  const [listChatRooms, setChatRooms] = useState()

  const createNewRoom = async () => {
    // TODO: Fetch create chat rooms
  }

  const sendMessage = async () => {
    // TODO: Fetch send message to chat room
  }

  const fetchListChatRooms = async () => {
    // TODO: Fetch list chat rooms
  }

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
        <Grid item xs={3} direction="column" className={style.listChatRooms}>
          <ChatRoomList/>
        </Grid>
        {/* Add button */}
        <ChatRoomWindow/>
      </Grid>
    </>
  );
};

export default Chat;
