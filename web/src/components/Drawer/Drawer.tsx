import React, { useState } from 'react';
import {
  AppBar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const Drawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useHistory().push;
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton onClick={(_) => setOpen(!open)}>
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <List>
          <ListItem
            button
            key="comparison"
            onClick={() => {
              navigate('/');
              setOpen(false);
            }}
          >
            <ListItemText primary="Comparison" />
          </ListItem>
          <ListItem
            button
            key="cars"
            onClick={() => {
              navigate('/cars');
              setOpen(false);
            }}
          >
            <ListItemText primary="Manage cars" />
          </ListItem>
        </List>
      </SwipeableDrawer>
    </>
  );
};

export default Drawer;
