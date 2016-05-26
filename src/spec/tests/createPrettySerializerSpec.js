
describe('createPrettySerializer', () => {
  const { createPrettySerializer } = require('../../lib')

  it('is a function', () => expect(createPrettySerializer).toEqual(jasmine.any(Function)))
  it('is a thunk', () => expect(createPrettySerializer()).toEqual(jasmine.any(Function)))
  it('thunk returns string always', () => expect(createPrettySerializer()()).toEqual(jasmine.any(String)))

  it('should serialize valid input to a non-zero string', () => {
    let input = { msg: 'Valid log message', err: new Error('a fake error occurred'), level: 50, pid: 100, hostname: 'idk' }
    let serializer = createPrettySerializer()
    let result = serializer(input)
    expect(result).toEqual(jasmine.any(String))
    expect(result).toMatch(/^ERROR\|/)
  })

  it('should produce same output for string of json variants of same input', () => {
    let input = { msg: 'Valid log message', err: { message: 'a fake error occurred', stack: 'fake stack trace' }, level: 50, pid: 100, hostname: 'idk' }
    let inputJSON = `{ "msg": "Valid log message", "err": { "message": "a fake error occurred", "stack": "fake stack trace" }, "level": 50, "pid": 100, "hostname": "idk" }`
    let serializer = createPrettySerializer()
    let result = serializer(input)
    let resultJSON = serializer(inputJSON)
    expect(result).toEqual(jasmine.any(String))
    expect(resultJSON).toEqual(jasmine.any(String))
    expect(result).toEqual(resultJSON)
  })

  it('should return NOPARSE level for unparseable', () => {
    let input = 'wtf this is not a bunyan format }}}}}'
    let serializer = createPrettySerializer()
    let result = serializer(input)
    expect(result).toEqual(jasmine.any(String))
    expect(result).toMatch(/^NOPARSE\|/)

  })
})
