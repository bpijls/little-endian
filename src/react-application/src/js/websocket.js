var socket = null;
var username = "";
//var webSocketUrl = 'ws://192.168.4.1:8000';
var webSocketUrl = 'ws://' + window.location.hostname + ':8000';

//connects to the web socket server if there not already is a connection open and sends the username of the logged in user
function connectSocket(user) {
    username = user;
    //console.log(username);
    //console.log(socket);
    if (socket == null) { //check if socket already is connected
        console.log("opening socket");
        try{
            socket = new WebSocket(webSocketUrl);
        }
        catch(err){
            console.log(err);
        }
        
    }
    socket.onopen = function (event) {
        //console.log(socket.readyState)
        send(null);
    };
    socket.onmessage = function (event) {
        //this is for error handling
        //console.log(event.data)
        var msg = JSON.parse(event.data);

        if(msg.message == "0x9"){//PING
            socket.send('{"message": "0xA"}');//PONG
        }
        else{
            alert("Error: " + msg.error);
        }
    }
    socket.onerror = function(event){
        if(event.data == undefined){
            alert("An error occurred while trying to connect the websocket.");
        }
        else{ 
            alert("Error: " + event.data);
        }
    }
}

//sends a message, if the connection is closed for some reason it will open a connection
function send(msg) {
    //check if socket is closed?
    if (socket == null) {
        connectSocket(username);
    }
    else if(socket.readyState == 2 ||socket.readyState == 3 ){
        alert('socket is in closing or closed state, please reconnect in settings')
    }
    else {
        //console.log(username);
        var jsonMsg = {
            "user": username,
            "platform": "webApp",
            "message": msg,
        }
        //add runQueue to the end of the message since it will need to call this function, else the code wont start running
        //an idea is later on to add this runqueue function to a button on the robot
        if(jsonMsg.message != null){
            jsonMsg.message += " callNextFunction();"
        }

        var stringify = (JSON.stringify(jsonMsg));
        socket.send(stringify);
    }
}

//closes the connection, this is used once you leave the page/closes the tab/closes the browser
function closeConnection() {
    //alert("closing");
    if (socket != null) {
        socket.close();
    }
}

function forceReconnect(){
    closeConnection();
    console.log("forcing a reconnect to the socket with username: " + username)
    socket = new WebSocket(webSocketUrl);
    connectSocket(username);
}

window.onunload = closeConnection;
window.onbeforeunload = closeConnection;

window.addEventListener("onunload", function (e) {
    closeConnection();
});
window.addEventListener("beforeunload", function (e) {
    closeConnection();
});


var functions = { connectSocket, send, forceReconnect };

export { functions }
