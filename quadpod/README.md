# RoboticaJS

## Quadpod

### Configuración del Robot

- Editando y ejecutando `$ node quadbpod/test` se puede establecer que servo esta conectado a que pin, y si apuntan o no en la dirección correcta.
- El paso anterior es el mas importante, hay que llevar bien las anotaciones.
- Con la información recaudada se debe completar la configuracion correcta en el archivo `robot.js`.
- Para la animación de los movimientos, se debe encontrar los puntos mas altos y bajos de movimiento en cada articulación (sin colisiones), esto nos dará los ángulos para las posiciones de inicio, medio y fin de cada extremo. **IMPORTANTE: Asegurarse que que las piernas no se golpeen en ningún punto de la animación**
- Una vez establecido el "grueso" de la animación se pueden realizar ajustes pequeños en cada paso para lograr movimientos mas naturales y fluidos.   


### Ejecutando y debugueando

1. Ejecutando `node quadpod` se puede probar el robots con las animaciones.

2. El script nos expone un objeto `quad` via [REPL](../examples/repl) para interactuar con robot, solo necesitamos tipear algo como:
    - `$ quad.walk(''|'rev')`
    - `$ quad.turn(''|'right')`
    - `$ quad.stand()`
    - `$ quad.stop()`
3. Si todo está funcionando bien, se pueden probar las animaciones/acciones creadas con el joystick. 

## License
Licensed under the MIT license.
