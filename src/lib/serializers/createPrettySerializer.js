


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
export default function createPrettySerializer( { showName = false
                                                , showHostname = false
                                                , showPid = true
                                                , showTime = true
                                                , showError = true
                                                , showSilly = false
                                                } = {}) {

  /**
   * Mapping of bunyan level numbers to log levels
   * @type {Object}
   */
  const LEVEL_MAP = { 10: 'TRACE'
                    , 20: 'DEBUG'
                    , 30: 'INFO'
                    , 40: 'WARN'
                    , 50: 'ERROR'
                    , 60: 'FATAL'
                    }

  /**
   * prettySerializer takes arguments from a bunyan WritableStream's write method and formats output in a human readable format.
   * @param  {...Object} args - args that were passed to WritableStream.prototype.write()
   * @return {string}           human readable string
   */
  return function prettySerializer(...args) {
    try {
      let [record, ...rest] = args
      try {
        record = typeof record === 'string' ? JSON.parse(record) : record
      } catch(err) {
        return `NOPARSE|${record}`
      }
      const { name, hostname, pid, level, msg, time, v, err } = record
      let levelName = level ? LEVEL_MAP[level] : 'UNKNOWN'
      let output = `${levelName}`
      if(showName && name)
        output += `|NAME=${name}`
      if(showHostname && hostname)
        output += `|HOSTNAME=${hostname}`
      if(showPid && pid)
        output += `|PID=${pid}`
      if(showTime && time)
        output += `|${time}`
      if(v)
        output += `|V=${v}`
      output += `|${msg}`

      if(showError && err) {
        const { message, stack } = err
        output += `|ERR=${message}\n${stack}`
      }
      if(showSilly)
        output += `\nSILLY => KEYS=[${Object.keys(record).join(', ')}]`
      return output
    } catch(err) {
      return `INTERNAL|ERR=an error occurred formatting output => ${err.message || err}`
    }
  }
}
