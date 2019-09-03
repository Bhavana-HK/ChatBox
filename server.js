const express = require('express');

const port = 8900;
const app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

let messages = [];
let users = [];

var getUserNames = () => {
    //console.log(users)
    return Object.keys(users).map((uid)=>users[uid].username);
}

var updateSocket = (user) => {
    currentUser = users[user.uid]
    users[user.uid] = {
        ...currentUser,
        sockets:[...currentUser.sockets, user.socketId]
    }
}

var createUser = (user) => {
    users[user.uid] = {
        username: user.username,
        uid: user.uid,
        sockets: [user.socketId],
    }
}

var removeSocket = (socketID) =>{
    Object.keys(users).map(uid=>{
        let index = users[uid].sockets.indexOf(socketID);
        if(index > -1) users[uid].sockets.splice(index, 1);
        if(users[uid].sockets.length < 1) delete users[uid];
    })
}

io.on('connection', function (client) {
    let query = client.request._query;
    let user = {
        username: query.username,
        uid: query.uid,
        socketId: client.id,
    }
    client.emit("testEvent", "new connection " + client.id)

    if (users[user.uid] !== undefined) {
        updateSocket(user);
        console.log("old user, new socket "+ JSON.stringify(getUserNames()) + user.socketId)
        client.emit('updateUsersList', getUserNames());
    }
    else {
        createUser(user);
        console.log("new user "+ JSON.stringify(getUserNames())+ user.socketId)
        io.emit('updateUsersList', getUserNames());
    }

    client.on("newMessage", (message)=>{
        console.log("a new message from "+ client.id+ "The message is : "+ message.message.text)
        client.broadcast.emit("message", message);
    })

    //client.emit("message", "hi thereee!!")

    // client.on('sendMessage', (data) => {
    //     messages.push(data)
    //     client.emit('recieveMessage', messages)
    //     console.log("message recieved is", JSON.stringify(data))
    // })

    client.on('disconnect', () => {
        console.log('client disconnect...', client.id)
        removeSocket(client.id)
        io.emit('updateUsersList', getUserNames());
    })

    client.on('error', function (err) {
        console.log('received error from client:', client.id)
        console.log(err)
    })
})

var server = http.listen(port, () => {
    console.log('server is running on port', server.address().port);
});