const five = require('johnny-five');

const board = new five.Board();

board.on('ready', () => {
  const eyes = new five.IR.Reflect.Array({
    emitter: 3,
    pins: ['A3'],
    freq: 25
  });

  eyes.on('data', () => {
    console.log(eyes.raw);
  });

  eyes.on('line', () => {
    console.log(eyes.line);
  });

  eyes.enable();
});
