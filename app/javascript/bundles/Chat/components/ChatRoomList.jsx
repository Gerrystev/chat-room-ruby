import * as React from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Add } from '@mui/icons-material';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { Input, InputLabel } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export default function ChatRoomList(props) {
  const [openModal, setOpenModal] = React.useState(false);
  const [newChatroomData, setChatRoomData] = React.useState({ name: '' });
  const [listChatrooms, setListChatRooms] = React.useState();
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const setFocusChatroomId = (id) => {
    props.setFocusChatroomId(id);
  }

  const handleChange = (event) => {
    setChatRoomData({ name: event.target.value });
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const createNewRoom = async (event) => {
    event.preventDefault();
    try {
      const form = new FormData()
      form.append('name', newChatroomData.name);
      const res = await fetch("/api/v1/chatroom", {
        method: 'POST',
        body: form
      });
      await fetchListChatRooms();
      handleClose();
    } catch (e) {
      console.error(e);
    }
  }
  
  const fetchListChatRooms = async () => {
    try {
      const res = await fetch("/api/v1/chatroom");
      const chatrooms = await res.json();
      const result = chatrooms.map(c => {
        return (
          <React.Fragment key={c.id}>
            <ListItemButton key={c.id} onClick={setFocusChatroomId.bind(this, c.id)}>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={c.name} />
            </ListItemButton>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        )
      });
      setListChatRooms(result);
    } catch (e) {
      console.error(e)
    }
  }

  React.useEffect(() => {
      fetchListChatRooms();
  }, []);

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Create new chatroom
          </Typography>
          <FormControl>
            <form onSubmit={createNewRoom}>
              <InputLabel htmlFor="formName">Name</InputLabel>
              <Input id="formName" name='name' value={newChatroomData.name} onChange={handleChange}/>
              <Button type='submit'>Submit</Button>
            </form>
          </FormControl>
        </Box>
      </Modal>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <ListItemButton
          onClick={handleOpen}>
          <ListItemAvatar>
            <Avatar>
              <Add />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Create new chatroom" />
        </ListItemButton>
        <Divider variant="inset" component="li" />
        {listChatrooms}
      </List>
    </>
  );
}

ChatRoomList.propTypes = {
  setFocusChatroomId: PropTypes.func.isRequired, // this is passed from the Rails view
};