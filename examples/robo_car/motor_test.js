import keypress from 'keypress';
const five = require('johnny-five');

let board = new five.Board(),
    configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V1;

keypress(process.stdin);

board.on('ready', () => {
    let motor1 = new five.Motor(configs.M1),
        motor2 = new five.Motor(configs.M2),
        motor3 = new five.Motor(configs.M3),
        motor4 = new five.Motor(configs.M4),
        currentMotor = motor1;
    process.stdin.on('keypress', (ch, key) => {
        let combo = '';
        if (key) {
            switch (key.name) {
                case '1':
                    currentMotor.stop();
                    currentMotor = motor1;
                    currentMotor.start(255);
                    console.log('switching to motor 1');
                    break;
                case '2':
                    currentMotor.stop();
                    currentMotor = motor2;
                    currentMotor.start(255);
                    console.log('switching to motor 2');
                    break;
                case '3':
                    currentMotor.stop();
                    currentMotor = motor3;
                    currentMotor.start(255);
                    console.log('switching to motor 3');
                    break;
                case '4':
                    currentMotor.stop();
                    currentMotor = motor4;
                    currentMotor.start(255);
                    console.log('switching to motor 4');
                    break;
                case 'up':
                    currentMotor.stop();
                    currentMotor.fwd(255);
                    break;
                case 'down':
                    currentMotor.stop();
                    currentMotor.rev(255);
                    break;
            }
        }
        if (key && key.ctrl && key.name === 'c') {
            process.stdin.pause();
        }
    });

});


process.stdin.setRawMode(true);
process.stdin.resume();
