import {
  captureException,
} from '@sentry/react';

export const error = (err) => {
  captureException(err);
};

export default error;
