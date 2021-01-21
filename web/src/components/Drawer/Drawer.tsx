import React, { useState } from 'react';
import {
  AppBar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { client } from '../../client';
import useUser from '../../hooks/useUser';

const Drawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useHistory().push;

  const user = useUser();

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
          {user ? (
            <>
              <ListItem key="user">
                <ListItemText primary={`Logged in as ${user.username}`} />
              </ListItem>

              <ListItem
                button
                key="logout"
                onClick={async () => {
                  localStorage.clear();
                  await client.clearStore();
                  navigate('/login');
                  setOpen(false);
                }}
              >
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <ListItem
              button
              key="login"
              onClick={() => {
                navigate('/login');
                setOpen(false);
              }}
            >
              <ListItemText primary="Login" />
            </ListItem>
          )}
          <Divider />

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

          {user ? (
            <>
              <Divider />
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
            </>
          ) : null}
        </List>
      </SwipeableDrawer>
    </>
  );
};

export default Drawer;
