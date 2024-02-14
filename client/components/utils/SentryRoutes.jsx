import {
  useEffect,
} from 'react';
import {
  Routes,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

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

export const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

