import { useQuery } from '@tanstack/react-query';

import { error, info } from '../../utils/logger';

export const useVerifySession = (setAlert) => {
  const sendRequest = async () => {
    try {
      const res = await fetch('/currentSession');
      if (res.status === 500) {
        info('Server returned 500 trying to retrieve current session');
        setAlert((alerts) => [...alerts, { severity: 'error', message: 'Uh oh... the server is currently down :(' }]);
      }

      const hasSession = await res.json();
      if (hasSession) {
        info(`User session found: ${hasSession.firstName} ${hasSession.lastName} ${hasSession.username}`);
      }

      return hasSession;
    } catch (err) {
      error(err);
    }
  };

  const queryKey = ['SESSION'];
  const queryConfig = {
    queryKey,
    queryFn: sendRequest,
  };

  const query = useQuery(queryConfig);

  return {
    queryKey,
    queryConfig,
    query,
  };
};
