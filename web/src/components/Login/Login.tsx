import { Button, Container } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LocalUser, userVar } from '../../client';
import useNotifications from '../../hooks/useNotifications';
import {
  useLoginMutation,
  useProfileQuery,
} from '../../types/generated-types-and-hooks';
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
  const { data, refetch } = useProfileQuery();
  const navigate = useHistory().push;

  const handleLogin = async () => {
    const infoKey = enqueueInfo(`Logging in as ${username}...`);
    try {
      const loginResult = await loginMutation({
        variables: {
          credentials: { username, idToken: 'dummyToken' },
        },
      });
      await refetch();
      const user: LocalUser | null =
        data && loginResult.data
          ? {
              username: data.profile.username,
              carIds: data.profile.cars.map((c) => c.id),
              accessToken: loginResult.data.login.access_token,
            }
          : null;
      userVar(user);
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
