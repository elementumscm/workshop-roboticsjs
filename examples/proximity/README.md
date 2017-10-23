## Ejemplo Boton

### Cableado
![cableado Proximidad](../../assets/proximity-hcsr04.png)

### Firmware
Este ejemplo requiere de una versión especial de Firmata llamada PingFirmata, y debe ser cargada en el Arduino para que el código funcione. 

Siguiendo los pasos especificados en la sección de [firmwares](../../firmwares#flasheando-un-arduino) se puede seleccionar la versión de firmata específica para HC-SR04.

### Código
```javascript
const five = require('johnny-five');
const board = new five.Board();

board.on('ready', function onReady() {
  const proximity = new five.Proximity({
    controller: 'HCSR04',
    pin: 7
  });

  proximity.on('data', function() {
    console.log('Proximity:');
    console.log(`cm  : ${proximity.cm}`);
    console.log(`in  : ${proximity.in}`);
    console.log('-----------------');
  });

  proximity.on('change', function onChange() {
    console.log('The obstruction has moved.');
  });
});
```

### Referencia de la API
[Botones](http://johnny-five.io/api/proximity/)