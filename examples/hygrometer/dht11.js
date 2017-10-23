const five = require('johnny-five');

let board = new five.Board();

board.on('ready', () => {

    let dht11 = new five.Thermometer({
        controller: 'DHT11_I2C_NANO_BACKPACK'
    });

    dht11.on('change', () => {
        console.log(`${dht11.celsius}°C`);
        console.log(`${dht11.humidity}%`);
    });
});
