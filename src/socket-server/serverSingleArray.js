var clients = [];

const WebSocket = require('ws');

const wss = new WebSocket.Server({
    port: 8000
});

wss.on('connection', function connection(ws) {
    console.log("Current open websockets: " + wss.clients.size);
    ws.on('message', function incoming(message) {
		console.log("------------------");
		console.log("raw message: "+message);
		var jsonMsg;
		
		try{
			jsonMsg = JSON.parse(message);
		}
		catch(err){
			console.log("Failed on parsing message:",err)
		}
        
        if (jsonMsg.platform == "Robot") {
			addRobotClient(jsonMsg, ws);
        }
        else if(jsonMsg.platform == "webApp") {
            if (jsonMsg.message == null) {
				addwebAppClient(jsonMsg, ws);
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
		//removeClosedSockets(jsonMsg);
		console.log('user disconnected');
	});
})

//checks the array for closing or closed sockets
/*function removeClosedSockets(json){
	for(var i in clients){
        if(clients[i].webAppWS != null){
            if(clients[i].webAppWS.readyState == 2 || clients[i].webAppWS. readyState == 2){
            }
        }
	}
}*/

function addwebAppClient(jsonMsg, ws){
    var user = getUser(jsonMsg);

    if(user != null){
        if(user.webAppWS != null){
            user.webAppWS.close();
        }
        user.webAppWS = ws;
    }
    else{
        clients.push({"user": jsonMsg.user, "webAppWS": ws});
        console.log("Added user: " + jsonMsg.user + " for platform: " + jsonMsg.platform);
    }
}

function addRobotClient(jsonMsg, ws){
    var user = getUser(jsonMsg);

    if(user != null){
        if(user.RobotWS != null){
            user.RobotWS.close();
        }
        user.RobotWS = ws;
    }
    else{
        clients.push({"user": jsonMsg.user, "RobotWS": ws});
        console.log("Added user: " + jsonMsg.user + " for platform: " + jsonMsg.platform);
    }
}

function getUser(jsonMsg){
    for(var i in clients){
        if(clients[i].user == jsonMsg.user){
            return clients[i];
        }
    }
    return null;
}

//find the correct robot (by looking at username) and send the message to that socket
function sendCodeToRobot(jsonMsg, ws){
    var user = getUser(jsonMsg);

    if(user.RobotWS != null){
        robotWS.send(jsonMsg.message);
    }
    else{
		//error handle
		removeClosedSockets(robotClients);
		console.log("Could not find the ws for the robot for user " + jsonMsg.user) 
		ws.send('{"error":"Robot was not found on the server, please connect it."}')
	}
}