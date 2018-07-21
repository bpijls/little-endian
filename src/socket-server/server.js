var webAppClients = [];
var robotClients = [];

const WebSocket = require('ws');

const wss = new WebSocket.Server({
    port: 8000
});

wss.on('connection', function connection(ws) {
	console.log("Current open websockets: " + wss.clients.size);
	
	var heartbeatMsg = '{"message": "0x9"}', heartbeatInterval = null, missedHeartbeats = 0, maxMissedHeartbeats = 3;
	console.log("starting heartbeat");
	console.log(heartbeatInterval === null);

	if (heartbeatInterval === null) {
        missedHeartbeats = 0;
        heartbeatInterval = setInterval(function() {
            try {
				console.log("missed heartbeats:",missedHeartbeats);
                missedHeartbeats++;
                if (missedHeartbeats >= maxMissedHeartbeats)
                    throw new Error("Too many missed heartbeats.");
                ws.send(heartbeatMsg);
            } catch(e) {
                clearInterval(heartbeatInterval);
                heartbeatInterval = null;
				console.warn("Closing connection. Reason: " + e.message);
				//ws.send('0x8');
				ws.close();
				removeClosedSockets(webAppClients);
				removeClosedSockets(robotClients);
            }
        }, 20000);
    }

    ws.on('message', function incoming(message) {
		console.log("------------------");
		console.log("raw message: "+message);
		var jsonMsg;
		
		try{
			jsonMsg = JSON.parse(message);//TODO: still crashes the server if it tries to parse something thats not json............
		}
		catch(err){
			console.log("Failed on parsing message:",err)
		}
		
		if(jsonMsg.message == "0xA"){//if server receives a Pong, minus the missed heartbeats by 1
			missedHeartbeats--;
		}
		else if (jsonMsg.platform == "Robot") {
			addClient(jsonMsg, ws, robotClients);
		}
		else if(jsonMsg.platform == "webApp") {
			if (jsonMsg.message == null) {
				addClient(jsonMsg, ws, webAppClients);
			}
			else {
				//send message to robot
				sendCodeToRobot(jsonMsg, ws);            
			}
		}
		else{
			//error handle
			//TODO send this to the client
			console.log("platform was not Robot or webApp???");
			ws.send('{"error":"Server not able to identify the platform."}')
		}
    })

	ws.on('close', function close() {
		removeClosedSockets(webAppClients);
		removeClosedSockets(robotClients);
		console.log('disconnected');
	});
})

//checks the array for closing or closed sockets
function removeClosedSockets(array){
	for(var i in array){
		if(array[i] == null || array[i].ws.readyState == 2 || array[i].ws.readyState == 3){//check if the socket is closing(2) or closed(3)
			console.log("Removing " + array[i].user)
			array.splice(i,1);
		}
	}
}

//calls removeClosedSockets to make sure the client is not already in the array and then adds the client
//If a client is connected with fx test@user.nl and another tries to connect with the same username check if that user is already there and remove
//that user if it is.
function addClient(jsonMsg, ws, array){
	removeClosedSockets(array);
	
	//check if the user is already in the array, remove if it finds a duplicate.
	for(var i in array){
		if(array[i].user == jsonMsg.user){
			console.log("found a duplicate user of "+ jsonMsg.user +" in the array, removing the old one.");
			array[i].ws.close();
			array.splice(i,1);
		}
	}
	
	array.push({"user": jsonMsg.user, "ws": ws});
	console.log("Added user: " + jsonMsg.user + " for platform: " + jsonMsg.platform);
}
/*
https://github.com/jrief/django-websocket-redis/blob/master/docs/heartbeats.rst
Close: 0x8
Ping: 0x9
Pong: 0xA
*/

//find the correct robot (by looking at username) and send the message to that socket
function sendCodeToRobot(jsonMsg, ws){
	var robotWS = null;
	for (var i in robotClients) {
        if (robotClients[i].user == jsonMsg.user) {
			robotWS = robotClients[i].ws;
        }
	}
	
	if(robotWS != null){
		//console.log("sending message:",jsonMsg.message)		
		var stringify = (JSON.stringify(jsonMsg));
		robotWS.send(stringify);
	}
	else{
		//error handle
		removeClosedSockets(robotClients);
		console.log("Could not find the ws for the robot for user " + jsonMsg.user) 
		ws.send('{"error\":"Robot ' + jsonMsg.user + ' was not found on the server, please connect it."}')
	}
}
