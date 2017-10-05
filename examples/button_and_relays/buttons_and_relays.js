const five = require('johnny-five');

let board = new five.Board();

board.on('ready', () => {
  const button = new five.Button({
    pin: 6,
    invert: true
  });
  const relays = five.Relays([8, 9, 10, 11]);

  button.on('hold', function onHold() {
    console.log('Button held - Toogle Relay 2');
    relays[1].toggle();
  });

  button.on('press', function onPress() {
    console.log('Button pressed - Toogle Relay 1');
    relays[0].toggle();
  });

  button.on('release', function onRelsase() {
    console.log('Button released');
  });
});
