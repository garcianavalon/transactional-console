const uuidV4 = require('uuid/v4');
const util = require('util');
const debug = require('debug')('transconsole');

// Override console methods to add a transactional logging.
const originalFunctions = {
  'debug': console.log,
  'info': console.info,
  'warn': console.warn,
  'error': console.error,
}

function _getTransactionId(message) {
  if (message && message.trans_map && message.trans_map.trans_id) {
    return message.trans_map.trans_id;
  }
  // generate a new trans_id
  const transId = uuidV4();
  if (!message) {
    debug(`Message is undefined, skipping`);
    return transId;
  }
  message.trans_map = message.trans_map || {};
  debug(`Setting transaction id to ${transId} to message ${message}`);
  message.trans_map.trans_id = transId;
  return transId;

}

function _recordLogMessage(message, logMessage, logLevel){
  if (!message) {
    return;
  }
  message = {};
  message.log_list = message.log_list || [];
  message.log_list.push({
    'log_level': logLevel,
    'log_message': logMessage,
  });
};

console.log = function (message, ...otherArgs) {
  // pre-log operations
  if(typeof message !== 'object') {
    debug(`method was called with no message object. Lets fake it`);
    otherArgs.unshift(message);
    message = {};
  }
  debug(`Logging message ${message} and otherArgs ${otherArgs}`);
  const transId = _getTransactionId(message);

  // originalLog
  // originalLog
  const base = `Transaction ${transId}` + otherArgs[0];
  const args = otherArgs.splice(0, 1);
  const logMessage = util.format(base, ...args);
  originalFunctions.debug(logMessage);

  // post-log operations
  _recordLogMessage(message, logMessage, 'debug');
}

console.info = function (message, ...otherArgs) {
  // pre-log operations
  if(typeof message !== 'object') {
    debug(`method was called with no message object. Lets fake it`);
    otherArgs.unshift(message);
    message = {};
  }
  debug(`Logging message ${message} and otherArgs ${otherArgs}`);
  const transId = _getTransactionId(message);

  // originalLog
  // originalLog
  const base = `Transaction ${transId}` + otherArgs[0];
  const args = otherArgs.splice(0, 1);
  const logMessage = util.format(base, ...args);
  originalFunctions.info(logMessage);

  // post-log operations
  _recordLogMessage(message, logMessage, 'info');
}

console.warn = function (message, ...otherArgs) {
  // pre-log operations
  if(typeof message !== 'object') {
    debug(`method was called with no message object. Lets fake it`);
    otherArgs.unshift(message);
    message = {};
  }
  debug(`Logging message ${message} and otherArgs ${otherArgs}`);
  const transId = _getTransactionId(message);

  // originalLog
  // originalLog
  const base = `Transaction ${transId}` + otherArgs[0];
  const args = otherArgs.splice(0, 1);
  const logMessage = util.format(base, ...args);
  originalFunctions.warn(logMessage);

  // post-log operations
  _recordLogMessage(message, logMessage, 'warn');
}

console.error = function (message, ...otherArgs) {
  // pre-log operations
  if(typeof message !== 'object') {
    debug(`method was called with no message object. Lets fake it`);
    otherArgs.unshift(message);
    message = {};
  }
  debug(`Logging message ${message} and otherArgs ${otherArgs}`);
  const transId = _getTransactionId(message);

  // originalLog
  // originalLog
  const base = `Transaction ${transId}` + otherArgs[0];
  const args = otherArgs.splice(0, 1);
  const logMessage = util.format(base, ...args);
  originalFunctions.error(logMessage);

  // post-log operations
  _recordLogMessage(message, logMessage, 'error');
}

// for testing
module.exports = {
  '_recordLogMessage': _recordLogMessage,
  '_getTransactionId': _getTransactionId,
  'originalFunctions': originalFunctions,
}
