const five = require('johnny-five');
const printii = require('printii')(__dirname);
const clear = require('clear');
const cliCursor = require('cli-cursor');
const charm = require('charm')();
const robot = require('./robot');
const nunchuk = require('./nunchuk');

clear();
printii();
cliCursor.hide();
charm.pipe(process.stdout);

// Set boards.
const boards = new five.Boards([
  { id: 'bot', port: '/dev/cu.NODEBOT_BETA-DevB' },  //replace with your bluetooth port id
  { id: 'nunchuk', port: '/dev/cu.usbserial-AH01CDU1' }, //replace with your usb port id
]);

function log(message) {
  if (typeof message === 'object') {
    message = JSON.stringify(message);
  }

  charm
    .position(0, 16)
    .move(0, 1)
    .erase('line')
    .foreground('green')
    .write(message);
}

const botState = {
  stand: false,
  sleep: false,
};

boards.on('ready', () => {
  console.log('BOARDS READY!');

  const bot = robot.init(five, boards[0]);
  nunchuk.init(five, boards[1]).onChange(state => {
    log(state);

    if (state.a) {
      if (botState.stand) {
        bot.sleep();
        botState.stand = false;
        log('BYE!');
      } else {
        bot.joints.to(60);
        botState.stand = true;
        log('TATAKAU!');
      }
      return;
    }

    if (state.b) {
      log('STOP');
      bot.stop();
      return;
    }

    if (state.x === 0 && state.y === 0) {
      log('QUIET');
      bot.stop();
      return;
    }

    if (state.x === 1) {
      log('TURN FORWARD');
      bot.turn();
      return;
    }

    if (state.x === -1) {
      log('TURN BACKWARDS');
      bot.turn('left');
      return;
    }

    if (state.y === 1) {
      log('WALK RIGHT');
      bot.walk();
      return;
    }

    if (state.y === -1) {
      log('WALK LEFT');
      bot.walk('rev');
      return;
    }
  });

  boards.repl.inject({ bot });
});
