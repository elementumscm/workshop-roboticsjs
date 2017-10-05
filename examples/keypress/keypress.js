const keypress = require('keypress');

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

process.stdin.on('keypress', (ch, key) => {
  let combo = '';
  if (key) {
    if (key.ctrl) {
      combo += 'ctrl + ';
    }

    if (key.shift) {
      combo += 'shift + ';
    }

    switch (key.name) {
      case 'up':
      case 'right':
      case 'down':
      case 'left':
      default:
        console.log(`${combo}${key.name}`);
    }
  }
  if (key && key.ctrl && key.name === 'c') {
    process.stdin.pause();
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();
