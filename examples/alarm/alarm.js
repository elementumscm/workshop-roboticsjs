const five = require('johnny-five');

const board = new five.Board();
const actions = {
  playSong: (buzzer) => {
    console.log('playing song');
    buzzer.play({
      // Song is composed by an array of pairs of notes and beats
      // The first argument is the note (null means 'no note')
      // The second argument is the length of time (beat) of the note (or non-note)
      song: [
        ['C4', 1 / 4],
        ['D4', 1 / 4],
        ['F4', 1 / 4],
        ['D4', 1 / 4],
        ['A4', 1 / 4],
        [null, 1 / 4],
        ['A4', 1],
        ['G4', 1],
        [null, 1 / 2],
        ['C4', 1 / 4],
        ['D4', 1 / 4],
        ['F4', 1 / 4],
        ['D4', 1 / 4],
        ['G4', 1 / 4],
        [null, 1 / 4],
        ['G4', 1],
        ['F4', 1],
        [null, 1 / 2]
      ],
      tempo: 100
    });
  }
};

board.on('ready', () => {
  const photoresistor = new five.Sensor({
    pin: 'A5',
    freq: 250
  });
  const piezoBuzzer = new five.Piezo({
    pin: 3
  });

  photoresistor.on('change', function change() {
    if (this.value < 20) {
      console.log(this.value);
      actions.playSong(piezoBuzzer);
    }
  });

  board.repl.inject({
    pot: photoresistor
  });
});
