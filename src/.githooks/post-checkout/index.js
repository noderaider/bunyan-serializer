#!/usr/bin/env node

import { createLogger } from 'bunyan'

const log = createLogger({ name: 'post-checkout', level: 'info' })
const [,, ...args] = process.argv
const [prevHEAD, newHEAD, checkoutType] = args

log.info({ prevHEAD, newHEAD, checkoutType }, 'post-checkout hook')

if(checkoutType === 'branch') {
  log.info('BRANCH CHECKOUT => EXECUTE HERE')
}
