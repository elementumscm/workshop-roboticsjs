const five = require('johnny-five');

const board = new five.Board();

board.on('ready', () => {
  const hall = new five.Sensor.Digital(3);

  hall.on('change', () => {
    console.log(hall.value);

  });
});
