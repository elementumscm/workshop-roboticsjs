const five = require('johnny-five');

const board = new five.Board();

board.on('ready', () => {
  const led = new five.Led(13);
  led.strobe(500);
  board.repl.inject({
    // Allow limited on/off control access to the
    // Led instance from the REPL.
    on: function() {
      led.on();
    },
    off: function() {
      led.off();
    }
  });
});
