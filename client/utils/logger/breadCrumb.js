import {
  addBreadcrumb,
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

export default breadCrumb;
