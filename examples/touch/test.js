const five = require('johnny-five');

let board = new five.Board();

board.on('ready', () => {

    let touch = new five.Sensor.Digital(3);

    touch.on('change', () => {
        if (touch.value === 1) {
            console.log('Keep your hands off!!!!');
        }
    });
});
