# RoboticaJS

## Firmata

### Flashing into an Arduino
Installing firmata in an arduino is extremely simple using [nodebots-interchage](https://github.com/johnny-five-io/nodebots-interchange/).

##### flashing from inside our project:
    $ npm run flash 

##### flashing outside from our project:
    $ npm install nodebots-interchange -g
    $ interchange install --interactive
    
in both cases you need to select the right options for your device. 


### Flashing into an NodeMCU, ESP8266 or similar. 
For this you will need the Arduino IDE installed (1.6.4 or later).

1. Open the Arduino IDE and go to **File > Preferences** 
2. Near to the bottom you will find an a text box called "Additional Board Manager URLs". there paste this: 
`http://arduino.esp8266.com/stable/package_esp8266com_index.json`
3. Then navigate to the Board Manager by going to **Tools > Boards > Boards Manager**. There should be a couple new entries in addition to the standard Arduino boards. Look for **esp8266**. Click on that entry, then select Install.
4. Lastly select your version of ESP8266 from the **Tools > Boards** menu

## License
Licensed under the MIT license.
