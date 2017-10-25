## Ejemplo Potenciometro

### Cableado
![cableado potenciometro](../../assets/potentiometer.png)

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
[Sensor](http://johnny-five.io/api/sensor)