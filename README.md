# bunyan-serializer

**bunyan-serializer is a lightweight module to pretty print a bunyan stream.**

**Dependences: none**

[![NPM](https://nodei.co/npm/bunyan-serializer.png?stars=true&downloads=true)](https://nodei.co/npm/bunyan-serializer/)

![dependencies](https://raw.githubusercontent.com/cchamberlain/bunyan-serializer/master/public/images/dependencies.png)

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
