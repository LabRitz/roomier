/* eslint-disable no-nested-ternary */
import React, { useMemo, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import CreatePost from './CreatePost';
import Profile from './Profile';
import NavBar from './NavBar';

import Context from './context/Context';
import { error, info } from '../utils/logger';

Sentry.init({
  dsn: 'https://917e39262caa4db0bab41139f4c8ddbd@o4504696226447360.ingest.sentry.io/4504696228675584',
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      ),
    }),
  ],
  tracesSampleRate: 0.2, // Lower sampling rate for prod
});

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const [alert, setAlert] = useState([]);

  const verifySession = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/currentSession');
      if (res.status === 500) {
        info('Server returned 500 trying to retrieve current session');
        setAlert((alerts) => [...alerts, { severity: 'error', message: 'Uh oh... the server is currently down :(' }]);
      }

      const hasSession = await res.json();
      if (hasSession) {
        info(`User session found: ${hasSession.firstName} ${hasSession.lastName} ${hasSession.username}`);
        setUserInfo(hasSession);
      }
      setTimeout(() => setIsLoading(false), 2000);
    } catch (err) {
      error(err);
    }
  };

  const handleDismiss = (i) => {
    setAlert((prev) => [...prev.slice(0, i), ...prev.slice(i + 1)]);
  };

  useEffect(() => {
    verifySession();
  }, []);

  const contextValue = useMemo(() => (
    { userInfo, setUserInfo, setAlert }
  ), [userInfo, setUserInfo, setAlert]);

  return (
    <Context.Provider value={contextValue}>
      {isLoading ? (
        <div
          data-testid="Login"
          style={{
            background: '#98C1D9',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <img src="roomier_loading.gif" alt="Loading..." style={{ height: '80vh' }} />
        </div>
      )
        : ((userInfo === '') ? (
          <Router>
            <SentryRoutes>
              <Route exact path="/" element={<Login />} />
              <Route
                path="/signup"
                element={<Signup />}
              />
            </SentryRoutes>
          </Router>
        ) : (
          <Router>
            <NavBar />
            <SentryRoutes>
              <Route exact path="/" element={<Home />} />
              <Route
                path="/createPost"
                element={<CreatePost />}
              />
              <Route path="/profile" element={<Profile />} />
            </SentryRoutes>
          </Router>
        ))}
      <Stack
        sx={{
          position: 'fixed', bottom: '12px', left: '12px', zIndex: 10, width: 'auto', maxWidth: '400px',
        }}
        spacing={1}
      >
        {alert.map((element, i) => (
          <Alert
            key={i}
            severity={element.severity}
            onClose={() => handleDismiss(i)}
            sx={{ boxShadow: '0px 4px 12px rgba(115, 115, 115, 0.5)' }}
          >
            <AlertTitle>
              {element.severity.charAt(0).toUpperCase() + element.severity.slice(1)}
            </AlertTitle>
            {element.message}
          </Alert>
        ))}
      </Stack>
    </Context.Provider>
  );
}

export default App;
