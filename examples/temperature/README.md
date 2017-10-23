## Ejemplo Boton

### Cableado
![cableado Termometro](../../assets/temperature-ds18b20.png)

### Código
```javascript
const five = require('johnny-five');

let board = new five.Board();

board.on('ready', () => {

  let temperature = new five.Thermometer({
    controller: 'DS18B20',
    pin: 3,
    freq: 1000
  });

  temperature.on('data', () => {
    // La ventaja del ds18b20 es que pueden conectarse multiples sensores en el mismo cable
    // y accederlos individualmente por medio del address.
    console.log(`${temperature.celsius}°C on 0x${temperature.address.toString(16)}`);
  });

});

```

### Referencia de la API
[Botones](http://johnny-five.io/api/sensor)
[Botones](http://johnny-five.io/api/thermometer)