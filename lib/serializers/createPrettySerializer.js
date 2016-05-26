'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPrettySerializer;
/**
 * createPrettySerializer is a thunk that takes configuration parameters and returns a bunyan serializer function.
 * @param  {boolean} options.showName     Enables printing the logger name in logs. (false)
 * @param  {boolean} options.showHostname Enables printing the hostname in logs. (false)
 * @param  {boolean} options.showPid      Enables printing the process id in the logs. (true)
 * @param  {boolean} options.showTime     Enables printing the timestamp in the logs. (true)
 * @param  {boolean} options.showError    Enables printing errors in the logs. (true)
 * @param  {boolean} options.showSilly    Prints additional debug information into the logs. (false)
 * @return {bunyanSerializer}             Returns a pretty formatting bunyanSerializer function that converts bunyan write input to human readable text.
 */
function createPrettySerializer() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$showName = _ref.showName;
  var showName = _ref$showName === undefined ? false : _ref$showName;
  var _ref$showHostname = _ref.showHostname;
  var showHostname = _ref$showHostname === undefined ? false : _ref$showHostname;
  var _ref$showPid = _ref.showPid;
  var showPid = _ref$showPid === undefined ? true : _ref$showPid;
  var _ref$showTime = _ref.showTime;
  var showTime = _ref$showTime === undefined ? true : _ref$showTime;
  var _ref$showError = _ref.showError;
  var showError = _ref$showError === undefined ? true : _ref$showError;
  var _ref$showSilly = _ref.showSilly;
  var showSilly = _ref$showSilly === undefined ? false : _ref$showSilly;

  /**
   * prettySerializer takes arguments from a bunyan WritableStream's write method and formats output in a human readable format.
   * @param  {...Object} args - args that were passed to WritableStream.prototype.write()
   * @return {string}           human readable string
   */
  return function prettySerializer() {
    try {
      var record = x;
      try {
        record = typeof x === 'string' ? JSON.parse(x) : x;
      } catch (err) {
        return 'INTERNAL|UNPARSEABLE=' + record;
      }
      var _record = record;
      var name = _record.name;
      var hostname = _record.hostname;
      var pid = _record.pid;
      var level = _record.level;
      var msg = _record.msg;
      var time = _record.time;
      var v = _record.v;
      var err = _record.err;

      var levelName = level ? LEVEL_MAP[level] : 'UNKNOWN';
      var output = '' + levelName;
      if (showName && name) output += '|NAME=' + name;
      if (showHostname && hostname) output += '|HOSTNAME=' + hostname;
      if (showPid && pid) output += '|PID=' + pid;
      if (showTime && time) output += '|' + time;
      if (v) output += '|V=' + v;
      output += '|' + msg;

      if (showError && err) {
        var message = err.message;
        var stack = err.stack;

        output += '|ERR=' + message + '\n' + stack;
      }
      if (showSilly) output += '\nSILLY => KEYS=[' + Object.keys(record).join(', ') + ']';
      return output;
    } catch (err) {
      return 'INTERNAL|ERR=an error occurred formatting output => ' + (err.message || err);
    }
  };
}