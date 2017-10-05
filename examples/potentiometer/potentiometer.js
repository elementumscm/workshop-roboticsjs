const five = require('johnny-five');

const board = new five.Board();

board.on('ready', () => {
  const potentiometer_1 = new five.Sensor({
    pin: 'A0',
    freq: 250
  });
  const potentiometer_2 = new five.Sensor({
    pin: 'A1',
    freq: 250
  });

  potentiometer_1.on('data', () => {
    potentiometer_1.value;
  });
  potentiometer_2.on('data', () => {
    potentiometer_2.value;
  });
});
