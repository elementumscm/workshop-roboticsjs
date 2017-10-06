const five = require('johnny-five');
const printii = require('printii')(__dirname);
const clear = require('clear');
const cliCursor = require('cli-cursor');
const charm = require('charm')();
const robot = require('./robot');
const nunchuk = require('./nunchuk');
const EtherPort = require('etherport');

clear();
printii();
cliCursor.hide();
charm.pipe(process.stdout);

// Set boards.
const boards = new five.Boards([
  { id: 'bot', port: new EtherPort(3030), timeout: 30000 }, // Make sure to have flashed the robot with your IP address and WIFI access data.
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
  });
  boards.repl.inject({ bot });
});
