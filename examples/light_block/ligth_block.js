const five = require('johnny-five');

const board = new five.Board();

board.on('ready', () => {
  const block = new five.Sensor.Digital(3);

  block.on('change', () => {
    if (block.value === 1) {
      console.log('I\'m blocked!!!');
    } else {
      console.log(block.value);
    }
  });
});
