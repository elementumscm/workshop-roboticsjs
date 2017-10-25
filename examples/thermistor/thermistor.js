const five = require('johnny-five');

let board = new five.Board();

function voltToTemp(resistance) {
    let tempC;
    const thermistorOhm = 10000,
        nominalTemp = 25,
        betaCoef = 3435,
        resistorOhm = 10000;

    resistance = 1023 / resistance - 1;
    resistance = resistorOhm / resistance;
    console.log(`Resistance: ${resistance}`);



    tempC = resistance / thermistorOhm;                 // (R/Ro)
    tempC = parseFloat(Math.log(tempC).toFixed(2));     // ln(R/Ro)
    tempC /= betaCoef;                                  // 1/B * ln(R/Ro)
    tempC += 1 / (nominalTemp + 273.15);                // + (1/To)
    tempC = 1 / tempC;                                  // Invert
    tempC -= 273.15;                                    // convert to C

    console.log(`Temperature: ${parseFloat(tempC.toFixed(2))}`);
}

board.on('ready', () => {

    let thermistor = new five.Sensor({
            pin: 'A0',
            freq: 1000
        }),
        average = 0,
        count = 0;

    thermistor.on('data', (data) => {
        if (count < 5) {
            average += data;
            count++;
        } else {
            voltToTemp(average/5);
            count = 0;
            average = 0;
        }

    });

});
