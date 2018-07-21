#Readme

Little-Endian is a little rover-like robot to be used for educational purposes, created by students from the Amsterdam University of Applied Sciences, (HBO-ICT, Minor IoT). The robot itself is based on a WiFi enabled microcontroller (the ESP8266) and can be programmed with a web-based blockly programming environment. For more detailed information, refer to the [design documentation](https://github.com/bpijls/little-endian/tree/master/documentation). 

**Building the robot**
The robot frame can be lasercut from 3mm mdf 
[PCB](https://dirtypcbs.com/store/designer/details/23296/6093/little-endian)

**Installation**

*	Install 'docker' and 'docker-compose' on your webserver
*	Clone this repository to a folder
*	Rename env.example to .env and determine the host name and virtual host subdomains
*	Run 'docker-compose build' from the root folder of this repository
*	To run the server, run 'docker-compose up' from the root folder
*	the server can be reached using the virtual host names you determined in the .env file or by typing the IP addres of the server in the address bar of your webbrowser. The webapplications runs on port 3000 and the socket server runs on port 8000.

**Usage**

Log in to the webapplication by entering a robot-id