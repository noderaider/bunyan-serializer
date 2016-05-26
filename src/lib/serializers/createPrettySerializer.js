
export default function createPrettySerializer( { showName = false
                                                , showHostname = false
                                                , showPid = true
                                                , showTime = true
                                                , showError = true
                                                , showSilly = false
                                                } = {}) {

  return function prettySerializer(...args) {
    try {
      let record = x
      try {
        record = typeof x === 'string' ? JSON.parse(x) : x
      } catch(err) {
        return `INTERNAL|UNPARSEABLE=${record}`
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
