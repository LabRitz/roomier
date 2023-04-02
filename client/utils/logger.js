import {
  addBreadcrumb, captureException, captureEvent, captureMessage,
} from '@sentry/react';

export const breadCrumb = (category, message, level, timestamp = Date.now(), data = null) => {
  addBreadcrumb({
    category,
    message,
    level,
    timestamp,
    data,
  });
};

export const error = (err) => {
  captureException(err);
};

export const event = (message, form, ...options) => {
  captureEvent({
    message,
    extra: {
      form,
      ...options,
    },
  });
};

export const info = (message) => {
  captureMessage(message);
};
