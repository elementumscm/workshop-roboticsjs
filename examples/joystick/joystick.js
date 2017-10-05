const five = require('johnny-five');

const board = new five.Board();

board.on('ready', () => {
  const joystick = new five.Joystick({
    pins: ['A0', 'A1'] //[ x, y ]
  });

  joystick.on('change', function() {
    console.log('Joystick');
    console.log('  x : ', this.x);
    console.log('  y : ', this.y);
    console.log('--------------------------------------');
  });
});
