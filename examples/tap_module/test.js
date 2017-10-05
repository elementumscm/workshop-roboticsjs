const five = require('johnny-five');

let board = new five.Board();

board.on('ready', () => {

    let tap = new five.Sensor.Digital(3);

    tap.on('change', () => {
        console.log('Tap that sensor!');
    });
});
