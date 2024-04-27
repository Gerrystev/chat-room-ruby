import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import * as style from './Chat.module.css';

export default function ChatRoomCard(props) {
  return (
    <Card 
        sx={{
            display: 'flex',
            "--Card-padding": "100px",
        }} 
        className={style.chatRoomCard}
    >
        <CardMedia
            component="img"
            sx={{ width: 70 }}
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPP6xazznREKjXA0VMd4e3EftP0YEEqduK7s_-XHM-Tg&s"
            alt="Live from space album cover"
        />
        <Box>
            <CardContent>
                <Typography component="div">
                    {props.name}
                </Typography>
            </CardContent>
        </Box>
    </Card>
  );
}

ChatRoomCard.propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
};