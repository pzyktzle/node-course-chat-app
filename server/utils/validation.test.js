const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var nonString = null;
    var isString = isRealString(nonString);
    expect(isString).toBe(false);
  });

  it('should reject strings with only spaces', () => {
    var nonString = '       ';
    var isString = isRealString(nonString);
    expect(isString).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    var string = 'A';
    var isString = isRealString(string);
    expect(isString).toBe(true);
  });

});
