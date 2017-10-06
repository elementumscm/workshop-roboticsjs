const five = require('johnny-five');
const EtherPort = require('etherport');
const board = new five.Board(
  {port: new EtherPort(3030), timeout: 30000 } // Make sure to have flashed the robot with your IP address and WIFI access data.
);

board.on('ready', () => {
  const a = new five.Servo({address: 0x41, controller: 'PCA9685', pin: 5});
  const b = new five.Servo({address: 0x41, controller: 'PCA9685', pin: 6});
  const c = new five.Servo({address: 0x41, controller: 'PCA9685', pin: 7});

  const d = new five.Servo({address: 0x41, controller: 'PCA9685', pin: 9});
  const e = new five.Servo({address: 0x41, controller: 'PCA9685', pin: 10});
  const f = new five.Servo({address: 0x41, controller: 'PCA9685', pin: 11});

  const g = new five.Servo({address: 0x41, controller: 'PCA9685', pin: 13});
  const h = new five.Servo({address: 0x41, controller: 'PCA9685', pin: 14});
  const i = new five.Servo({address: 0x41, controller: 'PCA9685', pin: 15});

  const j = new five.Servo({address: 0x40, controller: 'PCA9685', pin: 0});
  const k = new five.Servo({address: 0x40, controller: 'PCA9685', pin: 1});
  const l = new five.Servo({address: 0x40, controller: 'PCA9685', pin: 2});

  const m = new five.Servo({address: 0x40, controller: 'PCA9685', pin: 4});
  const n = new five.Servo({address: 0x40, controller: 'PCA9685', pin: 5});
  const o = new five.Servo({address: 0x40, controller: 'PCA9685', pin: 6});

  const p = new five.Servo({address: 0x40, controller: 'PCA9685', pin: 8});
  const q = new five.Servo({address: 0x40, controller: 'PCA9685', pin: 9});
  const r = new five.Servo({address: 0x40, controller: 'PCA9685', pin: 10});

  const servos = new five.Servos([ a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r]);
  board.repl.inject({
    a, b, c, d, e, f, g, h, servos
  });

});
