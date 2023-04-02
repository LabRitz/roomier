import {
  captureMessage,
} from '@sentry/react';

export const info = (message) => {
  captureMessage(message);
};

export default info;
