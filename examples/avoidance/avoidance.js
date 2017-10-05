const five = require('johnny-five');
const board = new five.Board();

board.on('ready', () => {
  const collision = new five.Sensor.Digital(3);

  collision.on('change', () => {
    if (collision.value === 0) {
      console.log('Brace for impact!!!!');
    }
  });
});
