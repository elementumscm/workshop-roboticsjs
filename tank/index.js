const five = require('johnny-five');
const EtherPort = require('etherport');

const speed = 255;

const board = new five.Board({ port: new EtherPort(3030), timeout: 30000 } // Make sure to have flashed the robot with your IP address and WIFI access data.
);
const int16 = function(msb, lsb) {
  const result = (msb << 8) | lsb;
  return result >> 15 ? ((result ^ 0xFFFF) + 1) * -1 : result;
};

board.on('ready', () => {
  board.i2cConfig();

  /*board.loop(250, () => { /**/
  board.i2cRead(0x0A, 6, (bytes) => {
    console.log(bytes);
    console.log("Left1 ", int16(bytes[0], bytes[1]));
    console.log("Left2 ", int16(bytes[2], bytes[3]));
    console.log("Right1 ", int16(bytes[4], bytes[5]));
    console.log("Right2 ", int16(bytes[6], bytes[7]));
    console.log("Back ", int16(bytes[8], bytes[9]));
  });
  /* */
  const fire = () => {
    board.i2cWrite(0x0A, [0x01]);
  };

  //const streaming = spawn('python', ['./camera/app.py']);
  const right = new five.Motor({
      pins: {
        pwm: 12, //5,
        dir: 13, //7,
        cdir: 15 //6
      }
    }),
    left = new five.Motor({
      pins: {
        pwm: 14, //10,
        dir: 0, //8,
        cdir: 2 //9
      }
    });
  const CarApi = {
    up: () => {
      console.log('asd');
      left.stop();
      right.stop();
      left.fwd(speed);
      right.fwd(speed);
    },
    down: () => {
      left.stop();
      right.stop();
      left.rev(speed);
      right.rev(speed);
    },
    right: () => {
      left.stop();
      right.stop();
      left.fwd(speed);
      right.rev(speed);
    },
    left: () => {
      left.stop();
      right.stop();
      left.rev(speed);
      right.fwd(speed);
    },
    hold: () => {
      left.stop();
      right.stop();
    },
    stop: () => {
      left.stop();
      right.stop();
    }
  };

  CarApi.left();
  board.repl.inject({
    car: CarApi
  })
});