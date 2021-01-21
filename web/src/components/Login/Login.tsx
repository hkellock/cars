import { Button, Container } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { client } from '../../client';
import useNotifications from '../../hooks/useNotifications';
import { useLoginMutation } from '../../types/generated-types-and-hooks';
import TextControl from '../common/TextControl';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');

  const {
    closeSnackbar,
    enqueueInfo,
    enqueueSuccess,
    enqueueError,
  } = useNotifications();

  const [loginMutation] = useLoginMutation();
  const navigate = useHistory().push;

  const handleLogin = async () => {
    const infoKey = enqueueInfo(`Logging in as ${username}...`);
    try {
      const loginResult = await loginMutation({
        variables: {
          credentials: { username, idToken: 'dummyToken' },
        },
      });
      if (!loginResult.data?.login.access_token) {
        throw new Error('Failed to get access token');
      }
      localStorage.setItem(
        'access_token',
        loginResult.data?.login.access_token,
      );
      await client.resetStore();
      enqueueSuccess('Login successful');
      navigate('/');
    } catch (error) {
      enqueueError(`Failed to log in as ${username}: ${error.message}`);
    }
    closeSnackbar(infoKey);
  };
  return (
    <Container style={{ textAlign: 'right' }}>
      <p> </p>
      <TextControl
        autoFocus
        label="Username"
        value={username}
        setValue={setUsername}
      />
      <Button color="secondary" size="large" onClick={() => setUsername('')}>
        Cancel
      </Button>
      <Button
        color="primary"
        size="large"
        variant="contained"
        style={{ alignItems: 'right' }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Container>
  );
};

export default Login;
