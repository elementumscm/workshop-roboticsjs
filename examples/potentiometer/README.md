## Ejemplo Boton

### Cableado
![cableado Sensor de movimiento](../../assets/potentiometer.png)

### Código
```javascript
const five = require('johnny-five');

const board = new five.Board();

board.on('ready', () => {
  const potentiometer = new five.Sensor({
    pin: 'A3',
    freq: 250
  });

  potentiometer.on('data', () => {
    potentiometer.value;
  });

});
```

### Referencia de la API
[Botones](http://johnny-five.io/api/motion)