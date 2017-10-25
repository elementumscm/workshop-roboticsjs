## Ejemplo Servomotores

### Cableado
![Cableado Servomotor](../../assets/servo.png)

### Código
```javascript
const five = require('johnny-five');

const board = new five.Board();

board.on('ready', function onReady() {
  const servo = new five.Servo({
    pin: 3,
    range: [0, 180],
    fps: 100,
    startAt: 90
  });

  servo.center();

  setTimeout(() => {
    servo.sweep();
  }, 1000);

  setTimeout(() => {
    servo.center();
  }, 5000);

});
```

### Referencia de la API
[Servo](http://johnny-five.io/api/servo)