# bunyan-serializer

**bunyan-serializer is a lightweight module to pretty print a bunyan stream.**

**Dependences: none**

[![NPM](https://nodei.co/npm/bunyan-serializer.png?stars=true&downloads=true)](https://nodei.co/npm/bunyan-serializer/)

## Install

`npm i -S bunyan-serializer`


## Documentation

This module creates a serializer that prints a bunyan stream in a human readable format. It was created for situations where you want readable log text and you aren't running bunyan from the CLI (cannot pipe to bunyan for pretty-printing).

I may add other formats down the road if there is a need for them so I've tried to setup its API to be as future proof as possible.


## How to use

```js
import { createPrettySerializer } from 'bunyan-serializer'

/** Optional parameters shown are the defaults if any or all are omitted. */
const serializer = createPrettySerializer({ showName: false
                                          , showHostname: false
                                          , showPid: true
                                          , showTime: true
                                          , showError: true
                                          , showSilly: false
                                          })


// ... within bunyan stream

  write = (...args) => {
    try {
      // dispatch a human readable string to whatever media the stream is targeted at.
      res.send(serializer(...args))
    } catch(err) {
      this.error(err)
      return false
    }
    return true
  };

// ...

```


## Options

**createPrettySerializer takes the following options:**

Name            | Type (default)    | Description
-------------   | ----------------- | -----------
`showName`      | `Boolean (false)` | Show the name of the logger in logs.
`showHostname`  | `Boolean (false)` | Show the hostname in logs.
`showPid`       | `Boolean (true)`  | Show the process id in logs.
`showTime`      | `Boolean (true)`  | Show the time in logs.
`showError`     | `Boolean (true)`  | Show error details in logs.
`showSilly`     | `Boolean (false)` | Show extra debug information (for development / debugging purposes)
