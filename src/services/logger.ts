import log4js from 'log4js'

const NODE_ENV = process.env.NODE_ENV?.trim();
if (NODE_ENV === 'prod') {
  log4js.configure({
    'appenders': {
      'out': { 'type': 'stdout' },
      'debug': { 'type': 'dateFile', 'filename': 'logs/debug', 'pattern': '-yyyy-MM-dd.log', 'alwaysIncludePattern': true, 'keepFileExt': true },
      'debug-filter': { 'type': 'logLevelFilter', 'appender': 'debug', 'level': 'debug', 'maxLevel': 'debug' },
      'result': { 'type': 'dateFile', 'filename': 'logs/result', 'pattern': '-yyyy-MM-dd.log', 'alwaysIncludePattern': true, 'keepFileExt': true },
      'result-filter': { 'type': 'logLevelFilter', 'appender': 'result', 'level': 'info', 'maxLevel': 'info' },
      'error': { 'type': 'dateFile', 'filename': 'logs/error', 'pattern': '-yyyy-MM-dd.log', 'alwaysIncludePattern': true, 'keepFileExt': true },
      'error-filter': { 'type': 'logLevelFilter', 'appender': 'error', 'level': 'error', 'maxLevel': 'error' },
      'default': { 'type': 'dateFile', 'filename': 'logs/default', 'pattern': '-yyyy-MM-dd.log', 'alwaysIncludePattern': true, 'keepFileExt': true },
      'warn': { 'type': 'dateFile', 'filename': 'logs/warn', 'pattern': '-yyyy-MM-dd.log', 'alwaysIncludePattern': true, 'keepFileExt': true },
      'warn-filter': { 'type': 'logLevelFilter', 'appender': 'warn', 'level': 'warn', 'maxLevel': 'warn' }
    },
    'categories': {
      'default': { 'appenders': ['out', 'default'], 'level': 'info' },
      'debug': { 'appenders': ['debug', 'debug-filter'], 'level': 'debug' },
      'result': { 'appenders': ['result-filter', 'debug-filter', 'error-filter', 'warn-filter'], 'level': 'debug' },
      'error': { 'appenders': ['error', 'error-filter'], 'level': 'error' },
      'warn': { 'appenders': ['warn', 'warn-filter'], 'level': 'warn' }
    }
  })
}
const logger = log4js.getLogger();
if (NODE_ENV !== 'dev') {
  logger.level = 'info';
}

export default logger;
