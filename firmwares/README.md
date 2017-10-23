# RoboticaJS

## Firmata

### Flasheando un Arduino
Instalar firmata en un arduino es extremadamente simple usando [nodebots-interchage](https://github.com/johnny-five-io/nodebots-interchange/). 

##### desde nuestro proyecto:
    $ npm run flash 

##### desde otro lugar:
    $ npm install nodebots-interchange -g
    $ interchange install --interactive
    
En ambos casos se deben seguir los pasos y seleccionar las opciones correctas para cada dispositivo. 


### Flasheand un NodeMCU, ESP8266 o similar. 
Para esto deberemos tener instalada la IDE de Arduino (1.6.4 o posterior).

1. Abrir la IDE de Arduino e ir a **File > Preferences** 
2. Cerca del final encontraremos una caja de texto llamada "Additional Board Manager URLs". Allí deberemos pegar lo siguiente: 
`http://arduino.esp8266.com/stable/package_esp8266com_index.json`
3. Luego iremos al administrador de dispositivos en **Tools > Boards > Boards Manager**. Alli encontraremos varias opciones ademas de las estandares de Arduino. Deberemos buscar por **esp8266**. Seleccionar esa entrada e instalar.
4. Por ultimo seleccionar la version adecuada de ESP8266 desde el menu **Tools > Boards**.

[Archivos de ejemplo](./standardFirmataWiFi) de firmata Wi Fi.


## License
Licensed under the MIT license.
