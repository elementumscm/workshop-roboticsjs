## Ejemplo Fotorresistencia

### Cableado
![cableado fotorresitencia](../../assets/fotorresistencia.png)

### Codigo
```javascript
const five = require('johnny-five');

const board = new five.Board();

board.on('ready', () => {
  const photoresistor = new five.Sensor({
    pin: 'A2',
    freq: 250
  });

  photoresistor.on('change', function onChange() {
    console.log(this.value);
  });

  photoresistor.on('data', function onData() {
    console.log(this.value);
  });
});
```

### Referencia de la API
[Sensores](http://johnny-five.io/api/sensor/)