# RoboticaJS

## Standard Firmata WiFi
Estos serían los cambios minimos necesarios para poder conectar un dispositivo con johnny five por medio de una red WiFi. 

### Cambios en los archivos
Los dispositivos pueden usar la mayoría de los tipos de concción para establecer un link con un host y proveer de transporte para la comunicación serial requerida por firmata. 
En este ejemplo nosotros vamos a utilizar la version WIFI de StandardFirmata, en combinación con un controlador de wifi ESP8266.

Para establecer el link necesitamos definir nuestros parámetros de configuración de la red [wifiConf](./wifiConf.h). Esta versión de firmata tiene soporte principalmente dispositivos Arduino, y dado que el ESP8266 tiene un rango diferente en la señal PWM, deberemos hacer unos ajustes al sketch principal [StandardFirmataWiFi](./StandardFirmataWiFi.ino) para resolver este inconveniente.
   
- wifiConfig.h: 
  - [Linea 114](./wifiConfig.h#L114): Colocamos nuesta IP separada por comas. 
  - [Linea 119](./wifiConfig.h#L119): Definimos nuestro SSID (nombre de la WiFi). 
  - [Linea 133](./wifiConfig.h#L133): Aseguremosnos de que en este puerto es donde el script de Johnny Five está escuchando por nuestro dispositivo.
  - [Linea 151](./wifiConfig.h#L151): Aqui colocamos la contraseña de nuestra WiFi.  
- StandardFirmataWiFi.ino:
  - [Linea 998](./StandardFirmataWiFi.ino#L998): Aqui agregaremos una linea para definir el rango analogo a 255. 

**Según la versión del StandardFirmataWiFi el número de linea en cada archivo puede variar, solo se deben utilizar los ejemplos dados como referencia**.

## License
Licensed under the MIT license.
