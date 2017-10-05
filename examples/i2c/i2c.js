const five = require('johnny-five');

const board = new five.Board();
const int16 = function(msb, lsb) {
  const result = (msb << 8) | lsb;
  return result >> 15 ? ((result ^ 0xFFFF) + 1) * -1 : result;
};

board.on("ready", () => {
  board.i2cConfig();
  board.i2cRead(0x0A, 4, (bytes) => {
    console.log("Temp: ", int16(bytes[0], bytes[1]));
  });
});
