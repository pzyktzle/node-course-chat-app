const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () =>{
    var from = 'from';
    var text = 'text';
    var message = generateMessage(from, text);
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(typeof message.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate the correct location message object', () =>{
    var from = 'from';
    var lat = 1;
    var long = 2;
    var message = generateLocationMessage(from, lat, long);
    expect(message.from).toBe(from);
    expect(message.url).toBe( `https://www.google.com/maps?q=${lat},${long}`);
    expect(typeof message.createdAt).toBe('number');
  });
});
