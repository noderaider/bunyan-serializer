
describe('createPrettySerializer', () => {
  const createPrettySerializer = require('../../lib/serializers/createPrettySerializer').default

  it('is a function', () => expect(createPrettySerializer).toEqual(jasmine.any(Function)))
  it('is a thunk', () => expect(createPrettySerializer()).toEqual(jasmine.any(Function)))
  it('thunk returns string always', () => expect(createPrettySerializer()()).toEqual(jasmine.any(String)))

  it('should serialize valid input to a non-zero string', () => {
    let input = { msg: 'Valid log message', err: new Error('a fake error occurred'), level: 50, pid: 100, hostname: 'idk' }
    let serializer = createPrettySerializer()
    let result = serializer(input)
    expect(result).toEqual(jasmine.any(String))
    expect(result).toMatch(/ERROR|/)
  })
})
