const five = require('johnny-five');

const board = new five.Board();

board.on('ready', () => {
  const ballSwitch = new five.Sensor.Digital(3);

  ballSwitch.on('change', () => {
    console.log('my ball is shaking!!!');
  });
});
