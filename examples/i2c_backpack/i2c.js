const five = require('johnny-five');
const EtherPort = require('etherport');
const board = new five.Board(
  {port: new EtherPort(3030), timeout: 30000 } // Make sure to have flashed the robot with your IP address and WIFI access data.
);
const int16 = function(msb, lsb) {
  const result = (msb << 8) | lsb;
  return result >> 15 ? ((result ^ 0xFFFF) + 1) * -1 : result;
};

board.on("ready", () => {
  board.i2cConfig();

  //board.loop(250, () => {
    board.i2cRead(0x0A, 6, (bytes) => {
      console.log(bytes);
      console.log("Left ", int16(bytes[0], bytes[1]));
      console.log("Right ", int16(bytes[2], bytes[3]));
      console.log("Back ", int16(bytes[4], bytes[5]));
    });
  //});
  const fire = () => {
    board.i2cWrite(0x0A, [0x01]);
  };

  board.repl.inject({
    fire
  });
});
