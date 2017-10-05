const five = require('johnny-five');
import xbox from 'xbox-controller-node';

let board = new five.Board(),
    configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V1;

console.log('start your engines!');

board.on('ready', () => {
    const AXIS_0 = 'none',
        resetPosition = 128;

    let motors = {
            left: [
                new five.Motor(configs.M1),
                new five.Motor(configs.M4)
            ],
            right: [
                new five.Motor(configs.M2),
                new five.Motor(configs.M3)
            ]
        },
        direction = 'none',
        steer = 'none';

    console.log('go!');


    function handleMotors(direction, steer) {
        let dirLeft = (direction === 'none') ? 'fwd' : direction,
            dirRight = (direction === 'none') ? 'fwd' : direction;
        if (direction === 'none' && steer === 'none') {
            motors.left[0].stop();
            motors.left[1].stop();
            motors.right[0].stop();
            motors.right[1].stop();
            return;
        }

        console.log(direction, steer);
        if (steer !== 'none') {
            motors.left[0].stop();
            motors.left[1].stop();
            motors.right[0].stop();
            motors.right[1].stop();

            dirLeft = 'rev',
            dirRight = 'fwd';
            if (steer === 'right') {
                dirLeft = 'fwd';
                dirRight = 'rev';
            }

            if (direction === 'rev') {
                let tmp = dirLeft;
                dirLeft = dirRight;
                dirRight = tmp;
            }
        }

        console.log(`left: ${dirLeft} right: ${dirRight}`);
        motors.left[0][dirLeft](255);
        motors.left[1][dirLeft](255);
        motors.right[0][dirRight](255);
        motors.right[1][dirRight](255);
    }

    xbox.on('leftstickUp', () => {
        //console.log('leftstickUp');
        if(direction !== 'fwd') {
            handleMotors('none', 'none');
        }
        direction = 'fwd';
        handleMotors(direction, steer);
    });

    xbox.on('leftstickUp:release', () => {
        //console.log('leftstickUp:release');
        if(direction !== 'none') {
            handleMotors('none', 'none');
        }
        direction = 'none';
        handleMotors(direction, 'none');
    });

    xbox.on('leftstickDown', () => {
        //console.log('leftstickDown');
        if(direction !== 'rev') {
            handleMotors('none', 'none');
        }
        direction = 'rev';
        handleMotors(direction, steer);
    });

    xbox.on('leftstickDown:release', () => {
        //console.log('leftstickDown:release');
        if(direction !== 'none') {
            handleMotors('none', 'none');
        }
        direction = 'none';
        handleMotors(direction, steer);
    });


    xbox.on('rightstickLeft', () => {
        //console.log('rightstickLeft');
        if(steer !== 'left') {
            handleMotors('none', 'none');
        }
        steer = 'left';
        handleMotors(direction, steer);
    });

    xbox.on('rightstickLeft:release', () => {
        //console.log('rightstickLeft:release');
        if(steer !== 'none') {
            handleMotors('none', 'none');
        }
        steer = 'none';
        handleMotors(direction, steer);
    });

    xbox.on('rightstickRight', () => {
        //console.log('rightstickRight');
        if(steer !== 'right') {
            handleMotors('none', 'none');
        }
        steer = 'right';
        handleMotors(direction, steer);
    });

    xbox.on('rightstickRight:release', () => {
        //console.log('rightstickRight:release');
        if(steer !== 'none') {
            handleMotors('none', 'none');
        }
        steer = 'none';
        handleMotors(direction, steer);
    });

});
