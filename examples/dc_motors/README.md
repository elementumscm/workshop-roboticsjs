## Ejemplo Motores Continuos

### Cableado
![Cableado motores continuos](../../assets/boton.png)

### Codigo
```javascript
const five = require('johnny-five');

let board = new five.Board();

board.on('ready', () => {
  const button = new five.Button({
    pin: 2,
    invert: true // algunos botones vienen con el modo invertido.
  });

  button.on('hold', function onHold() {
    console.log('Button held');
  });

  button.on('press', function onPress() {
    console.log('Button pressed');
  });

  button.on('release', function onRelease() {
    console.log('Button released');
  });
});
```

### Referencia de la API
[Botones](http://johnny-five.io/api/button/)