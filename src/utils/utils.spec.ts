import { dangerousDeepClone, isEven, isOdd, parseIntValue } from './utils';

describe('Test parseIntValue', () => {

  it('return numbers', () => {
    const validNumbersToParse = ['10', '0', 10, 0, 23.5, '12b', '9.3'];

    const parsed = validNumbersToParse.map(parseIntValue);
    expect(parsed).toStrictEqual([10, 0, 10, 0, 23, 12, 9]);
  });

  it('throw errors', () => {

    const throwCauseString = () => {
      parseIntValue('aaa');
    };

    const throwCauseStringWithNumber = () => {
      parseIntValue('aaa20');
    };

    expect(throwCauseString).toThrowError('Unable to parse argument \'aaa\' as an integer');
    expect(throwCauseStringWithNumber).toThrowError('Unable to parse argument \'aaa20\' as an integer');
  });

});

describe('Test dangerousDeepClone', () => {
  it('clone an object deep', () => {
    const original = {
      'hello': ['world', 'universe', { 'whatever': 'else' }]
    };

    const fakeClone = original;

    const clone = dangerousDeepClone(original);

    expect(Object.is(original, fakeClone)).toBeTruthy();
    expect(Object.is(original, clone)).toBeFalsy();
  });

  it('clone an array deep', () => {
    const original = [1, 2, 3, 4];
    const fakeClone = original;
    const clone = dangerousDeepClone(original);

    original[0] = 0;

    expect(Object.is(original, fakeClone)).toBeTruthy();
    expect(Object.is(original, clone)).toBeFalsy();
    expect(fakeClone[0]).toEqual(0);
    expect(clone[0]).toEqual(1);
  });

});

describe('Test isEven', () => {
  it('should pass', () => {
    expect(isEven(100)).toBe(true);
  });
  it('should fail', () => {

    expect(isEven(99)).toBe(false);
  });
});


describe('Test isOdd', () => {
  it('should pass', () => {
    expect(isOdd(100)).toBe(false);
  });
  it('should fail', () => {

    expect(isOdd(99)).toBe(true);
  });
});
