const five = require('johnny-five');

let board = new five.Board();

board.on('ready', () => {

    let shock = new five.Sensor.Digital(3);

    shock.on('change', () => {
        if (shock.value === 1) {
            console.log('I\'m shocked!!!');
        }
    });
});
