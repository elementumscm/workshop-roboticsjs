## Ejemplo Keypress

Nos permite interceptar las acciones del teclado y definirle callbacks para los distintos eventos de una tecla. El siguiente es un ejemplo clásico del uso de keypress, se puede utilizar  para unir las flechas del teclado con las acciones de adelante, atras y giro de un robot. 

### Código
```javascript
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
  // keep escaping if ctrl+c is pressed
  if (key && key.ctrl && key.name === 'c') {
    process.stdin.pause();
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();


```
