const five = require('johnny-five');

let board = new five.Board();

board.on('ready', () => {
  let sensor = new five.Sensor.Digital(3);

  sensor.on('change', () => {
    console.log(`my state is ${ sensor.value ? 'on' : 'off' }`);
  });
});
