## Ejemplo Boton

### Cableado
![cableado Sensor de movimiento](../../assets/movement.png)

### Código
```javascript
const five = require('johnny-five');
const board = new five.Board();

board.on('ready', function onReady() {
  // Create a new `motion` hardware instance.
  const motion = new five.Motion(7);
  
  // 'calibrated' occurs once, at the beginning of a session,
  motion.on('calibrated', function calibrated() {
    console.log('calibrated');
  });

  // 'motionstart' events are fired when the 'calibrated'
  // proximal area is disrupted, generally by some form of movement
  motion.on('motionstart', function motionStart() {
    console.log('motionstart');
  });

  // 'motionend' events are fired following a 'motionstart' event
  // when no movement has occurred in X ms
  motion.on('motionend', function motionEnd() {
    console.log('motionend');
  });

  // 'data' events are fired at the interval set in opts.freq
  // or every 25ms. Uncomment the following to see all
  // motion detection readings.
  motion.on('data', function onData(data) {
    console.log(data.detectedMotion);
  });
});

```

### Referencia de la API
[Botones](http://johnny-five.io/api/motion)