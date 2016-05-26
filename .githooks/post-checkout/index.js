#!/usr/bin/env node
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _bunyan = require('bunyan');

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var log = (0, _bunyan.createLogger)({ name: 'post-checkout', level: 'info' });

var _process$argv = _toArray(process.argv);

var args = _process$argv.slice(2);

var _args = _slicedToArray(args, 3);

var prevHEAD = _args[0];
var newHEAD = _args[1];
var checkoutType = _args[2];


log.info({ prevHEAD: prevHEAD, newHEAD: newHEAD, checkoutType: checkoutType }, 'post-checkout hook');

if (checkoutType === 'branch') {
  log.info('BRANCH CHECKOUT => EXECUTE HERE');
}