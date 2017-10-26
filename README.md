# RoboticaJS
Desarrollaremos los conceptos básicos de robótica y domótica utilizando tecnologías conocidas y componentes de muy bajo presupuesto y al alcance de todos.

Utilizaremos JavaScript como lenguaje base de progarmación para los dispositivos.

_Author [Marcos Tomatti](mailto:mtomatti@elementum.com)_

### Prerequisitos

- [Git](https://git-scm.com)
- [Node.js and npm](nodejs.org) Node ^6.9.11 **IMPORTANTE**

### Instalación

1. Colnar este repositorio:
   `$ git clone git@github.com:elementumscm/workshop-roboticsjs.git`

2. Para instalar las dependencias del proyecto ejecutar:
   
   `$ npm install`
   
3. Según los diferentes sistemas operativos, podríamos encontrarnos con alguno de los siguientes problemas comunes:
    - Linux, sin permisos para leer/ecribir el puerto USB:
        - `$ sudo usermod -a -G dialout <username>`
        - `$ sudo chmod a+rw /dev/ttyACM0`

        Donde &lt;username&gt; es el nombre de nuestro usuario en linux, /dev/ttyACM0 es el puerto de nuestro Arduino, el ID del dispositivo puede cambiar según la marca y modelo del board.

    - Windows, es recomendable correr la consola como administrador.
    - Mac OSX, suele no reconocer los USB de los arduinos. Para idenitifcar el modelo y bajar los drivers hay que correr:
        - `$ brew update && brew tap jlhonora/lsusb && brew install lsusb`
        - Ejecutandp `$ lsusb` con y sin el arduino conectado podremos identificar que ID de fabricante y de dispositivo tiene el microcontrolador. Ese id nos permitirá buscar y encontrar el driver adecuado para nuestro dispositivo.
          
          ![lsusb](./assets/lsusb_device_id.png)

4. Si todo salió bien, ya podemos probar nuestro arduino con un simple "hola mundo":
    `$ npm start`

### Firmware
Cuando tenemos un arduino nuevo, o debemos usar una versión especial de firmata para conectar a nuestros dispositivos, deberemos _flashearlo_.

En la sección de [firmwares](./firmwares) encontrarán detalles de como hacerlo.

### Kits
Para el workshop tenemos preparados algunos kits con diferentes desafíos:
- [Kit 1](./kit1)
- [Kit 2](./kit2)
- [Kit 3](./kit3)
- [Kit 4](./kit4)
- [Kit 5](./kit5)
- [Simon x3](./simon_x3)
- [Simon x4](./simon_x4)
- [Robot Arm](./robot-arm)
- ~~[Step by Step](./step-by-step)~~
- [SpaceBucket](./spacebucket)
- [Quadpod](./quadpod)
- [Hexapod](./hexapod)


### Ejemplos de Codigo
- [Botones](./examples/button)
- [Fotoresistencia](./examples/photoresistor)
- [Higrómetro](./examples/hygrometer)
- [Leds](./examples/led)
- [Leds RGB](./examples/rgb_led)
- [Leds de 2 colores](./examples/two_color_leds)
- [Motores continuos](examples/dc_motors/)
- [Servomotores](./examples/servo_motors)
- *[Motores paso a paso](./examples/steppers)
- [Piezo / Sonido](./examples/piezo)
- [Sensores análgos y digitales](./examples/sensors)
- [Sensor de movimiento](./examples/movement)
- [Potenciómetro](./examples/potentiometer)
- [Termistor](./examples/thermistor)
- [Termómetro](./examples/temperature)

Otros ejemplos:
- [Backpack  I2C](./examples/i2c_backpack)
- [Keypress](./examples/keypress)
- [REPL](./examples/repl)

## Presentación
Los slides de la presentación del workshop pueden encontrarlos [aqui](https://docs.google.com/presentation/d/1eZ7Vt9LG6fp64gvVSviCgytMsvBdvqT8KcOFrs97kFM/edit?usp=sharing).

## License
Licensed under the MIT license.
