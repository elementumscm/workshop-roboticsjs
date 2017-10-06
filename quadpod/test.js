const five = require('johnny-five');

const board = new five.Board(
  {port: '/dev/cu.NODEBOT_BETA-DevB', timeout: 30000 } // replace this with the right port on your machine
);

board.on('ready', () => {

  const a = new five.Servo({ pin: 6 });
  const b = new five.Servo({ pin: 7 });
  const c = new five.Servo({ pin: 8 });
  const d = new five.Servo({ pin: 9 });
  const e = new five.Servo({ pin: 10 });
  const f = new five.Servo({ pin: 11 });
  const g = new five.Servo({ pin: 12 });
  const h = new five.Servo({ pin: 13 });

  const servos = new five.Servos([a, b, c, d, e, f, g, h]);

  board.repl.inject({
    a, b, c, d, e, f, g, h, servos
  });

});
