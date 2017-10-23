## Ejemplo LED RGB

### Cableado
![Led RGB]()
### Codigo
```javascript
const five = require('johnny-five');

const board = new five.Board();

board.on('ready', () => {
  const rgbLed = new five.Led.RGB([9, 10, 11]);
  const rainbow = ['FF0000', 'FF7F00', 'FFFF00', '00FF00', '0000FF', '4B0082', '8F00FF'];
  let i = 0;
  
  rgbLed.on();
  rgbLed.color('#ff0000');
  board.loop(1000, () => {
    if (i + 1 === rainbow.length) {
      i = 0;
    }
    rgbLed.color(rainbow[i++]);
  });
});
```

### Referencia de la API
[Leds](http://johnny-five.io/api/led)
