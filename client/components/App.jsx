/* eslint-disable no-nested-ternary */
import { styled } from '@mui/material/styles';
import React, {
  useMemo, useCallback, useState, useEffect,
} from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

import { useVerifySession } from '../hooks/session/useVerifySession';

import { SentryRoutes } from './utils/SentryRoutes';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import CreatePost from './CreatePost';
import Profile from './Profile';
import NavBar from './NavBar';
import Context from './context/Context';

export const App = () => {
  const [userInfo, setUserInfo] = useState('');
  const [alert, setAlert] = useState([]);

  const { query: useVerifySessionQuery } = useVerifySession(setAlert);

  const isLoading = useMemo(() => {
    return useVerifySessionQuery.isLoading;
  }, [useVerifySessionQuery.isLoading]);

  const hasSession = useMemo(() => {
    if (isLoading) return;

    return useVerifySessionQuery.data;
  }, [isLoading, useVerifySessionQuery.data]);

  const handleDismiss = useCallback((i) => {
    setAlert((prev) => [...prev.slice(0, i), ...prev.slice(i + 1)]);
  }, []);

  const contextValue = useMemo(
    () => ({ userInfo, setUserInfo, setAlert }),
    [userInfo, setUserInfo, setAlert],
  );

  useEffect(() => {
    if (hasSession) {
      return setUserInfo(hasSession);
    }
  }, [hasSession]);

  return (
    <Context.Provider value={contextValue}>
      {isLoading ? (
        <LoadingWrapper data-testid="Login">
          <img
            src="roomier_loading.gif"
            alt="Loading..."
            style={{ height: '80vh' }}
          />
        </LoadingWrapper>
      ) : userInfo === '' ? (
        <Router>
          <SentryRoutes>
            <Route exact path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </SentryRoutes>
        </Router>
      ) : (
        <Router>
          <NavBar />
          <SentryRoutes>
            <Route exact path="/" element={<Home />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/profile" element={<Profile />} />
          </SentryRoutes>
        </Router>
      )}
      <AlertStackWrapper spacing={1}>
        {alert.map((element, i) => (
          <AlertWrapper
            key={i}
            severity={element.severity}
            onClose={() => handleDismiss(i)}
          >
            <AlertTitle>
              {element.severity.charAt(0).toUpperCase()
                  + element.severity.slice(1)}
            </AlertTitle>
            {element.message}
          </AlertWrapper>
        ))}
      </AlertStackWrapper>
    </Context.Provider>
  );
};

const LoadingWrapper = styled('div')(() => ({
  background: '#98C1D9',
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
}));

const AlertStackWrapper = styled(Stack)(() => ({
  position: 'fixed',
  bottom: '12px',
  left: '12px',
  zIndex: 10,
  width: 'auto',
  maxWidth: '400px',
}));

const AlertWrapper = styled(Alert)(() => ({
  boxShadow: '0px 4px 12px rgba(115, 115, 115, 0.5)',
}));
