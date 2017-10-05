const keypress = require('keypress');
const five = require('johnny-five');

const minSpeed = 1000;
const maxSpeed = 250;
const speedStep = 250;
const minDegree = 0;
const maxDegree = 180;
const degreeStep = 10;

keypress(process.stdin);

const board = new five.Board();
const keys = new Set(['up', 'right', 'down', 'left']);
let currentAngle = 90;
let currentSpeed = 250;

const decreaseAngle = () => (currentAngle - degreeStep > minDegree) ? currentAngle - degreeStep : currentAngle;

const increaseAngle = () => (currentAngle + degreeStep < maxDegree) ? currentAngle + degreeStep : currentAngle;

const decreaseSpeed = () => (currentSpeed + speedStep < maxSpeed) ? currentSpeed + speedStep : currentSpeed;

const increaseSpeed = () => (currentSpeed - speedStep > minSpeed) ? currentSpeed - speedStep : currentSpeed;

board.on('ready', function onReady() {
  const servo = new five.Servo({
    id: 'servo1',
    pin: 3,
    range: [0, 180],
    fps: 100,
    startAt: 90
  });

  //optional
  this.repl.inject({
    servo: servo
  });

  process.stdin.on('keypress', (ch, key) => {
    if (!key || !keys.has(key.name)) {
      return;
    }
    switch (key.name) {
      case 'up':
        currentSpeed = (key.ctrl) ? maxSpeed : increaseSpeed();
        break;
      case 'right':
        currentAngle = (key.ctrl) ? maxDegree : increaseAngle();
        break;
      case 'down':
        currentSpeed = (key.ctrl) ? minSpeed : decreaseSpeed();
        break;
      case 'left':
        currentAngle = (key.ctrl) ? minDegree : decreaseAngle();
        break;
    }

    if (key && key.ctrl && key.name === 'c') {
      process.stdin.pause();
    }

    servo.to(currentAngle, currentSpeed);
  });
});

process.stdin.setRawMode(true);
process.stdin.resume();
