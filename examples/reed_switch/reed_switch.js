const five = require('johnny-five');

const board = new five.Board();

board.on('ready', () => {
  const reedSwitch = new five.Sensor.Digital(3);

  reedSwitch.on('change', () => {
    if (reedSwitch.value === 1) {
      console.log('I\'m feeling attracted!!!');
    }
  });
});
