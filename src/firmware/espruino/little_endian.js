
/* Copyright (c) 2017 Gordon Williams, Pur3 Ltd. See the file LICENSE for copying permission. */
function StepperMotor(obj) {
  this.pins = obj.pins;
  this.pattern = obj.pattern || [0b0010,0b0001,0b0100,0b1000];
  this.offpattern = obj.offpattern || 0;
  this.pos = 0;
  this.stepsPerSec = obj.stepsPerSec || 300;
  this.onstep = obj.onstep || 0;
}

StepperMotor.prototype.setHome = function() {
  this.pos = 0;
};

StepperMotor.prototype.getPosition = function() {
  return this.pos;
};

StepperMotor.prototype.stop = function(turnOff) {
  if (this.interval) {
    clearInterval(this.interval);
    this.interval = undefined;
  }
  if (turnOff)
    digitalWrite(this.pins, this.offpattern);
};

StepperMotor.prototype.moveTo = function(pos, milliseconds, callback, turnOff) {
  pos = 0|pos;
  if (milliseconds===undefined)
    milliseconds = Math.abs(pos-this.pos)*1000/this.stepsPerSec;
  this.stop(turnOff);
  if (pos != this.pos) {
    var stepper = this;
    var step = function() {
      if (stepper.pos == pos) {
        stepper.stop(turnOff);
        if (callback)
          callback();
      } else {
        stepper.pos += (pos < stepper.pos) ? -1 : 1;
        digitalWrite(stepper.pins, stepper.pattern[ stepper.pos & (stepper.pattern.length-1) ]);
      }
      if (stepper.onstep) stepper.onstep(stepper.pos);
    };
    this.interval = setInterval(step, milliseconds / Math.abs(pos-this.pos));
    step();
  } else {
    if (callback)
      setTimeout(callback, milliseconds);
  }
};

var motorLeft = new StepperMotor({
  pins:[D0,D2,D4,D5]
});

var motorRight = new StepperMotor({
  pins:[D12,D13,D14,D16]
});

var queue = [];

function forward(steps) {
  print("forward");
  motorRight.moveTo(motorRight.getPosition()+steps, undefined, callNextFunction);
  motorLeft.moveTo(motorLeft.getPosition()-steps);
}


function backward(steps) {
  print("backwards");
  motorRight.moveTo(motorRight.getPosition()-steps, undefined, callNextFunction);
  motorLeft.moveTo(motorLeft.getPosition()+steps);
}


function turnRight(steps) {
  print("turnRight");
  motorRight.moveTo(motorRight.getPosition()-steps, undefined, callNextFunction);
  motorLeft.moveTo(motorLeft.getPosition()-steps);
}

function turnLeft(steps) {
  print("turnLeft");
  motorRight.moveTo(motorRight.getPosition()+steps, undefined, callNextFunction);
  motorLeft.moveTo(motorLeft.getPosition()+steps);
}

function turn(direction, degrees){
  var d = degrees * 14;
  if(direction == 'turnRight'){
    queue.push('turnRight('+d+')');
  }
  else{
    queue.push('turnLeft('+d+')');
  }
}

function move(direction, steps){
  if(direction == 'forward'){
    queue.push('forward('+steps+')');
  }
  else if(direction == 'backward'){
    queue.push('backward('+steps+')');
  }
}

function callNextFunction(){
  if(queue.length > 0){
    eval(queue[0]);
    queue.shift();
  }
}

/* embed websocket module here */
/** Minify String.fromCharCode() call */
var strChr = String.fromCharCode;

function buildKey() {
  var randomString = btoa(Math.random().toString(36).substr(2, 18));
  var toHash = randomString + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
  return {
    source: randomString,
    hashed: btoa(require('crypto').SHA1(toHash))
  }
}

function WebSocket(host, options) {
  this.socket = null;
  options = options || {};
  this.host = host;
  this.port = options.port || 80;
  this.protocolVersion = options.protocolVersion || 13;
  this.origin = options.origin || 'Espruino';
  this.keepAlive = options.keepAlive * 1000 || 60000;
  this.masking = options.masking!==undefined ? options.masking : true;
  this.path = options.path || "/";
  this.protocol = options.protocol;
  this.lastData = "";
  this.key = buildKey();
  this.connected = false || options.connected;
  this.headers = options.headers || {};
}

WebSocket.prototype.initializeConnection = function () {
  require("net").connect({
    host: this.host,
    port: this.port
  }, this.onConnect.bind(this));
};

WebSocket.prototype.onConnect = function (socket) {
  this.socket = socket;
  var ws = this;
  socket.on('data', this.parseData.bind(this));
  socket.on('close', function () {
    if (ws.pingTimer) {
      clearInterval(ws.pingTimer);
      ws.pingTimer = undefined;
    }
    ws.emit('close');
  });

  this.handshake();
};

WebSocket.prototype.parseData = function (data) {
  // see https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers
  // Note, docs specify bits 0-7, etc - but BIT 0 is the MSB, 7 is the LSB
  var ws = this;
  this.emit('rawData', data);

  if (this.lastData.length) {
    data = this.lastData+data;
    this.lastData="";
  }

  if (!this.connected) {
    // FIXME - not a good idea!
    if (data.indexOf(this.key.hashed) > -1 && data.indexOf('\r\n\r\n') > -1) {
      this.emit('handshake');
      this.pingTimer = setInterval(function () {
        ws.send('ping', 0x89);
      }, this.keepAlive);
      data = data.substring(data.indexOf('\r\n\r\n') + 4);
      this.connected = true;
      this.emit('open');
    }
    this.lastData = data;
    return;
  }

  while (data.length) {
    var offset = 2;
    var opcode = data.charCodeAt(0)&15;
    var dataLen = data.charCodeAt(1)&127;
    if (dataLen==126) {
      dataLen = data.charCodeAt(3) | (data.charCodeAt(2)<<8);
      offset += 2;
    } else if (dataLen==127) throw "Messages >65535 in length unsupported";
    var pktLen = dataLen+offset+((data.charCodeAt(1)&128)?4/*mask*/:0);
    if (pktLen > data.length) {
      // we received the start of a packet, but not enough of it for a full message.
      // store it for later, so when we get the next packet we can do the whole message
      this.lastData = data;
      return;
    }

    switch (opcode) {
      case 0xA:
      this.emit('pong');
      break;
      case 0x9:
      this.send('pong', 0x8A);
      this.emit('ping');
      break;
      case 0x8:
      this.socket.end();
      break;
      case 0:
      case 1:
      var mask = [ 0,0,0,0 ];
      if (data.charCodeAt(1)&128 /* mask */)
        mask = [ data.charCodeAt(offset++), data.charCodeAt(offset++),
      data.charCodeAt(offset++), data.charCodeAt(offset++)];
      var msg = "";
      for (var i = 0; i < dataLen; i++)
        msg += String.fromCharCode(data.charCodeAt(offset++) ^ mask[i&3]);
      this.emit('message', msg);
      break;
      default:
      console.log("WS: Unknown opcode "+opcode);
    }
    data = data.substr(pktLen);
  }
};

WebSocket.prototype.handshake = function () {
  var socketHeader = [
  "GET " + this.path + " HTTP/1.1",
  "Host: " + this.host,
  "Upgrade: websocket",
  "Connection: Upgrade",
  "Sec-WebSocket-Key: " + this.key.source,
  "Sec-WebSocket-Version: " + this.protocolVersion,
  "Origin: " + this.origin
  ];
  if (this.protocol)
    socketHeader.push("Sec-WebSocket-Protocol: "+this.protocol);
  
  for(var key in this.headers) {
    if (this.headers.hasOwnProperty(key))
      socketHeader.push(key+": "+this.headers[key]);
  }

  this.socket.write(socketHeader.join("\r\n")+"\r\n\r\n");
};

/** Send message based on opcode type */
WebSocket.prototype.send = function (msg, opcode) {
  opcode = opcode === undefined ? 0x81 : opcode;
  var size = msg.length;
  if (msg.length>125) {
    size = 126;
  }
  this.socket.write(strChr(opcode, size + ( this.masking ? 128 : 0 )));

  if (size == 126) {
    // Need to write extra bytes for longer messages
    this.socket.write(strChr(msg.length >> 8));
    this.socket.write(strChr(msg.length));
  }

  if (this.masking) {
    var mask = [];
    var masked = '';
    for (var ix = 0; ix < 4; ix++){
      var rnd = Math.floor( Math.random() * 255 );
      mask[ix] = rnd;
      masked += strChr(rnd);
    }
    for (var ix = 0; ix < msg.length; ix++)
      masked += strChr(msg.charCodeAt(ix) ^ mask[ix & 3]);
    this.socket.write(masked);
  } else {
    this.socket.write(msg);
  }
};

WebSocket.prototype.close = function() {
  this.socket.end();
};

function connectToSocketServer(){
  var host = "192.168.4.1";
  console.log("Connecting to SocketServer: " + host + " ...")

  console.log("create websocket");  
  var ws = new WebSocket(host, {
    path: '/',
    port: 8000, // default is 80
    protocol : "echo-protocol", // websocket protocol name (default is none)
    protocolVersion: 13, // websocket protocol version, default is 13
    origin: 'Espruino',
    keepAlive: 600,
    headers:{ some:'header', 'ultimate-question':42 } // websocket headers to be used e.g. for auth (default is none)
  });

  console.log("add open event");
  ws.on('open', function(error) {
    console.log(error);
    console.log("Connected to server");
    var username = getSerial().substring(getSerial().length-4).toLowerCase() + "@user.nl";
    var msg = '{"user":"'+username+'","platform":"Robot","message":null}';

    console.log(msg);
    console.log(username);

    ws.send('{"user":"'+username+'","platform":"Robot","message":null}');
  });

  //msg is the message the server sends to this client, to make the server send something type in ws.send("something"); in the console window.
  //This will be the blockly code, send from the server
  ws.on('message', function(msg) {    
    var jsonMsg = JSON.parse(msg);
    
    if(jsonMsg.message == "0x9"){
      //console.log("Got a ping, sending a pong.");
      ws.send('{"message": "0xA"}');
    }
    else {
      console.log("Will eval this:");
      console.log(jsonMsg);
      eval(jsonMsg.message);
    }
  });

  ws.initializeConnection();

  console.log("Connected to SocketServer.")
}

function connectToWifi(onReady){
  console.log("Connecting to WiFi...")
  var WIFI_NAME = "LittleEndian";
  var WIFI_OPTIONS = { password : "LittleEndian" };
  var wifi = require("Wifi");

  wifi.connect(WIFI_NAME, WIFI_OPTIONS, function(err) {

    if (err) {
      console.log("Connection error: " + err);
      return;
    }
    else
      console.log("Connected to WiFi");

    onReady();
  });
}

function delayConnectToSocketServer(){
  try{
    connectToSocketServer();
  }
    catch(e){
    delayConnectToSocketServer();
  }  
}

function onInit(){
  console.log("connecting...");
  connectToWifi(delayConnectToSocketServer);
}

save();
