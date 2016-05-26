'use strict';

describe('createPrettySerializer', function () {
  var _require = require('../../lib');

  var createPrettySerializer = _require.createPrettySerializer;


  it('is a function', function () {
    return expect(createPrettySerializer).toEqual(jasmine.any(Function));
  });
  it('is a thunk', function () {
    return expect(createPrettySerializer()).toEqual(jasmine.any(Function));
  });
  it('thunk returns string always', function () {
    return expect(createPrettySerializer()()).toEqual(jasmine.any(String));
  });

  it('should serialize valid input to a non-zero string', function () {
    var input = { msg: 'Valid log message', err: new Error('a fake error occurred'), level: 50, pid: 100, hostname: 'idk' };
    var serializer = createPrettySerializer();
    var result = serializer(input);
    expect(result).toEqual(jasmine.any(String));
    expect(result).toMatch(/^ERROR\|/);
  });

  it('should produce same output for string of json variants of same input', function () {
    var input = { msg: 'Valid log message', err: { message: 'a fake error occurred', stack: 'fake stack trace' }, level: 50, pid: 100, hostname: 'idk' };
    var inputJSON = '{ "msg": "Valid log message", "err": { "message": "a fake error occurred", "stack": "fake stack trace" }, "level": 50, "pid": 100, "hostname": "idk" }';
    var serializer = createPrettySerializer();
    var result = serializer(input);
    var resultJSON = serializer(inputJSON);
    expect(result).toEqual(jasmine.any(String));
    expect(resultJSON).toEqual(jasmine.any(String));
    expect(result).toEqual(resultJSON);
  });

  it('should return NOPARSE level for unparseable', function () {
    var input = 'wtf this is not a bunyan format }}}}}';
    var serializer = createPrettySerializer();
    var result = serializer(input);
    expect(result).toEqual(jasmine.any(String));
    expect(result).toMatch(/^NOPARSE\|/);
  });
});