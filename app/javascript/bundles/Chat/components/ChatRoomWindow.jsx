import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Grid, Input, Button } from '@mui/material';
import * as ActionCable from 'actioncable';

import SendIcon from '@mui/icons-material/Send';

import * as style from './Chat.module.css';

export default function ChatRoomWindow(props) {
    const [chatRoomName, setChatRoomName] = React.useState();
    const [listMessage, setListMessage] = React.useState([]);
    const [messageContent, setMessageContent] = React.useState('');
    const [subscription, setSubscription] = React.useState();

    const cableUrl = process.env.WEBSOCKET_URL || 'ws://localhost:3000/cable';
    const cable = ActionCable.createConsumer(cableUrl);

    const createSubscription = () => {
        if (subscription) {
            subscription.unsubscribe();
        }
        const subs = cable.subscriptions.create(
            { channel: 'ChatChannel', room: props.chatRoomId },
            { received: message => handleReceivedMessage() }
        );
        setSubscription(subs);
    }

    const handleChange = (event) => {
        setMessageContent(event.target.value);
    };

    const handleReceivedMessage = async () => {
        await getListMessage();
    }

    const mapMessages = () => {
        return listMessage.map(c => {
            return (
                <div className={style.chatMessage} key={c.id}>{c.content}</div>
            )
        });
    }

    const sendMessage = async () => {
        if (!props.chatRoomId) return
        try {
            const form = new FormData()
            form.append('content', messageContent);
            await fetch(`/api/v1/chatroom/${props.chatRoomId}/message`, {
              method: 'POST',
              body: form
            });
        } catch (e) {
            // console.error(e);
        }
    }

    const getListMessage = async () => {
        if (!props.chatRoomId) return
        try {
            const res = await fetch(`/api/v1/chatroom/${props.chatRoomId}/message`);
            const messages = await res.json();
            setListMessage(messages);
        } catch (e) {
            // console.error(e)
        }
    }

    const getChatRoom = async () => {
        if (!props.chatRoomId) return
        try {
            const res = await fetch(`/api/v1/chatroom/${props.chatRoomId}`);
            const chatroom = await res.json();
            setChatRoomName(chatroom.name);
        } catch (e) {
            // console.error(e)
        }
    }

    React.useEffect(() => {
        if (props.chatRoomId) {
            getChatRoom();
            getListMessage();
            createSubscription();
        }
    }, [props.chatRoomId]);

    return (
        <Grid container item xs={9} direction="column">
            <Grid container item className={style.chatRoomHeader} xs={1}>
                <Typography variant="h4" component="h2" marginTop="10px" marginLeft="10px" fontWeight="bold" color="white">
                    {chatRoomName}
                </Typography>
            </Grid>
            <Grid item className={style.chatRoomContent} xs={10} textAlign="right">
                {mapMessages()}
            </Grid>
            <Grid container item className={style.chatRoomMessageContainer} xs={1}>
                <Grid item xs={11} padding="10px" textAlign="center">
                    <Input name='message' fullWidth={true} value={messageContent} onChange={handleChange}  className={style.chatRoomMessageGrid}></Input>
                </Grid>
                <Grid item xs={1} textAlign="center" paddingTop="1rem">
                    <Button variant="contained" onClick={sendMessage} endIcon={<SendIcon />}>Send</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

ChatRoomWindow.propTypes = {
    chatRoomId: PropTypes.number, // this is passed from the Rails view
};