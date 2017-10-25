const five = require('johnny-five');

let board = new five.Board();

board.on('ready', () => {

    let sensor = new five.Sensor({
        pin: 'A0'
        //freq: 250,
        //threshold: 5
    });

    sensor.on('change', function onChange() {
        console.log(this.value);
    });
});
