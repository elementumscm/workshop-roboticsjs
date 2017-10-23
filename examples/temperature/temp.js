const five = require('johnny-five');

let board = new five.Board();

board.on('ready', () => {

  let temperature = new five.Thermometer({
    controller: 'DS18B20',
    pin: 3,
    freq: 1000
  });

  temperature.on('data', () => {
    console.log(`${temperature.celsius}°C on 0x${temperature.address.toString(16)}`);
  });

});
