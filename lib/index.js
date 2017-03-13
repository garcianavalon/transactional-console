const uuidV4 = require('uuid/v4');
const util = require('util');
const debug = require('debug')('transconsole');

function _getTransactionId(transactionMessage) {
  if (transactionMessage && transactionMessage.trans_map && transactionMessage.trans_map.trans_id) {
    return transactionMessage.trans_map.trans_id;
  }
  // generate a new trans_id
  const transId = uuidV4();
  if (!transactionMessage) {
    debug(`transactionMessage is undefined, skipping`);
    return transId;
  }
  transactionMessage.trans_map = transactionMessage.trans_map || {};
  debug(`Setting transaction id to ${transId} to transactionMessage ${transactionMessage}`);
  transactionMessage.trans_map.trans_id = transId;
  return transId;

}

function _recordLogMessage(transactionMessage, logMessage, logLevel){
  if (!transactionMessage) {
    return;
  }
  transactionMessage.log_list = transactionMessage.log_list || [];
  transactionMessage.log_list.push({
    'log_level': logLevel,
    'log_message': logMessage,
  });
};

module.exports.log = function (transactionMessage, logMessage, ...otherArgs) {
  // pre-log operations
  const transId = _getTransactionId(transactionMessage);

  // delegate to console
  const base = `Transaction ${transId} - ` + logMessage;
  const formatedMessage = util.format(base, ...otherArgs);
  console.log(formatedMessage);

  // post-log operations
  _recordLogMessage(transactionMessage, logMessage, 'debug');
}

module.exports.info = function (transactionMessage, logMessage, ...otherArgs) {
  // pre-log operations
  const transId = _getTransactionId(transactionMessage);

  // delegate to console
  const base = `Transaction ${transId} - ` + logMessage;
  const formatedMessage = util.format(base, ...otherArgs);
  console.info(formatedMessage);

  // post-log operations
  _recordLogMessage(transactionMessage, logMessage, 'info');
}

module.exports.warn = function (transactionMessage, logMessage, ...otherArgs) {
  // pre-log operations
  const transId = _getTransactionId(transactionMessage);

  // delegate to console
  const base = `Transaction ${transId} - ` + logMessage;
  const formatedMessage = util.format(base, ...otherArgs);
  console.warn(formatedMessage);

  // post-log operations
  _recordLogMessage(transactionMessage, logMessage, 'warn');
}

module.exports.error = function (transactionMessage, logMessage, ...otherArgs) {
  // pre-log operations
  const transId = _getTransactionId(transactionMessage);

  // delegate to console
  const base = `Transaction ${transId} - ` + logMessage;
  const formatedMessage = util.format(base, ...otherArgs);
  console.error(formatedMessage);

  // post-log operations
  _recordLogMessage(transactionMessage, logMessage, 'error');
}

// for testing
module.exports = Object.assign(module.exports, {
  '_recordLogMessage': _recordLogMessage,
  '_getTransactionId': _getTransactionId,
});
