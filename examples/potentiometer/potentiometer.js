const five = require('johnny-five');

const board = new five.Board();

board.on('ready', () => {
  const potentiometer = new five.Sensor({
    pin: 'A3',
    freq: 250
  });

  potentiometer.on('data', () => {
    potentiometer.value;
  });

});
