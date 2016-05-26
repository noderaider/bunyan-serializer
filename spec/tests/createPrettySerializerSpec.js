'use strict';

describe('createPrettySerializer', function () {
  var createPrettySerializer = require('../../lib/serializers/createPrettySerializer').default;

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
    expect(result).toMatch(/ERROR|/);
  });
});