## Sensores

### Cableado
El cableado de sensores _genéricos_ varía según el dispositivo en si. Algunos operan de forma similar a una foto o termorresistencia, otros tienen entradas de 5v, GND y una salida de señal digital o análoga. La mayoría, a su vez, pueden requerir de resistencias de valores especificos para operar correctamente o proteger el arduino de potenciales cortocircuitos. Lo único standard en este caso es el código que utilizaremos que es prácticamente el mismo para todos los casos.   

### Código para sensor *digital*
```javascript
const five = require('johnny-five');

let board = new five.Board();

board.on('ready', () => {
  let sensor = new five.Sensor.Digital(3);

  sensor.on('change', () => {
    console.log(`my state is ${ sensor.value ? 'on' : 'off' }`);
  });
});
```

### Código para sensor *analógico*
```Javascript
const five = require('johnny-five');

let board = new five.Board();

board.on('ready', () => {

    let sensor = new five.Sensor({
        pin: 'A0',
        freq: 250,   // en milisegundos, cada cuanto lee data del sensor. Afecta la frecuencia del evento on('data', ...)
        threshold: 5    // diferencia entre lecturas que sirve para disparar el evento on('change', ...)
    });

    sensor.on('change', function onChange() {
        console.log(this.value);
    });
});
```

### Referencia de la API 

[Sensors](http://johnny-five.io/api/sensor)