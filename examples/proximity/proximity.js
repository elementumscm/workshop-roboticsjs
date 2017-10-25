const five = require('johnny-five');
const board = new five.Board();

board.on('ready', function onReady() {
  const proximity = new five.Proximity({
    controller: 'HCSR04',
    pin: 7
  });

  proximity.on('data', function() {
    console.log('Proximity:');
    console.log(`cm  : ${proximity.cm}`);
    console.log(`in  : ${proximity.in}`);
    console.log('-----------------');
  });

  proximity.on('change', function onChange() {
    console.log('The obstruction has moved.');
  });
});