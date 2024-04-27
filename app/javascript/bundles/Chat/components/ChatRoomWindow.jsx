import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import { Grid, FormControl, Input, Paper, Button } from '@mui/material';

import SendIcon from '@mui/icons-material/Send';

import * as style from './Chat.module.css';

export default function ChatRoomWindow(props) {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    React.useEffect(() => {
        
    }, []);

    return (
        <Grid container item xs={9} direction="column">
            <Grid container item className={style.chatRoomHeader} xs={1}>
                
            </Grid>
            <Grid item className={style.chatRoomContent} direction="column" xs={10} textAlign="right">
                <div className={style.chatMessage}>teteet</div>
            </Grid>
            <Grid container item className={style.chatRoomMessageContainer} xs={1}>
                <Grid item xs={11} padding="10px" textAlign="center">
                    <Input name='message' fullWidth={true} className={style.chatRoomMessageGrid}></Input>
                </Grid>
                <Grid item xs={1} textAlign="center" paddingTop="1rem">
                    <Button variant="contained" endIcon={<SendIcon />}>Send</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

ChatRoomWindow.propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
};