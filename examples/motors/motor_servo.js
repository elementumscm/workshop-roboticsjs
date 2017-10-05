const five = require('johnny-five');

const board = new five.Board();

board.on('ready', function onReady() {
  const servo = new five.Servo({
    id: 'servo1',
    pin: 3,
    range: [0, 180],
    fps: 100,
    startAt: 90
  });

  // Add servo to REPL (optional)
  this.repl.inject({
    servo: servo
  });

  // Servo API

  // min()
  //
  // set the servo to the minimum degrees
  // defaults to 0
  //
  // eg. servo.min();

  // max()
  //
  // set the servo to the maximum degrees
  // defaults to 180
  //
  // eg. servo.max();

  // center()
  //
  // centers the servo to 90°
  //
  // servo.center();

  // to( deg )
  //
  // Moves the servo to position by degrees
  //
  // servo.to( 90 );

  // step( deg )
  //
  // step all servos by deg
  //
  // eg. array.step( -20 );

  servo.center();
});
