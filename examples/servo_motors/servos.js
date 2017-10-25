const five = require('johnny-five');

const board = new five.Board();

board.on('ready', function onReady() {
  const servo = new five.Servo({
    pin: 3,
    range: [0, 180],
    fps: 100,
    startAt: 90
  });

  servo.center();

  setTimeout(() => {
    servo.sweep();
  }, 1000);

  setTimeout(() => {
    servo.center();
  }, 5000);

});
