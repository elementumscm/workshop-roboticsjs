# RoboticaJS

## Standard Firmata WiFi

### Changes in the files
Devices can use most of connection types to stablish a link with a host to provide a transport for the serial communication required by firmata.
In this case we will use the WiFi version of firmata, in combination with an ESP8266 wifi controller. 

To stablish the link we need to set up our wifi config paramterers (wifiConf.h). This version of firmata has mainly Arduino boards in mind, but since the ESP8266 has a different range for its PWM signal, we will be tweaking the main sketch (StandardFirmataWiFi.ino) to work solve this problem. 

- wifiConfig.h: 
  - [L 114]: Set the server IP split by commas. 
  - [L 119]: Set the SSID (wifi name) as is. 
  - [L 133]: Define the port were johnny five will be listening for this device.
  - [L 151]: Here you put the password for the wifi network.  
- StandardFirmataWiFi.ino:
  - [L 998]: We set the analog write range to 255 instead of the 

### Flashing the board. 
1. Run `npm install` to install server dependencies.

2. Run the following lines (linux only):
    - `$ sudo usermod -a -G dialout <username>`
    - `$ sudo chmod a+rw /dev/ttyACM0`

Where &lt;username&gt; is your login  user name in linux, /dev/ttyACM0 is the detected device of your Arduino board, the name may actually change depending on the board.

## License
Licensed under the MIT license.
