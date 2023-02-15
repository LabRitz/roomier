const winston = require('winston');
const { format } = require('winston');

const { combine } = format;

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    format.timestamp({
      format: 'MM-DD-YYYY HH:mm:ss',
    }),
    format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error', dirname: 'logs' }),
    new winston.transports.File({ filename: 'allLogs.log', dirname: 'logs' }),
  ],
});

module.exports = logger;
