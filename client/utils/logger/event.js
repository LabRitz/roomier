import {
  captureEvent,
} from '@sentry/react';

export const event = (message, form, ...options) => {
  captureEvent({
    message,
    extra: {
      form,
      ...options,
    },
  });
};

export default event;
