const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 1234;
const path = require('path');

app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
});

// io.on('connection', (sockt)=>{
//     console.log('user is connected...');
//     sockt.emit("customerEvent","Hello Guys How Are You???");

//     sockt.on('Hello',(data)=>{
//         console.log(data);
//     })
//     sockt.on('disconnect',()=>{
//         console.log('User is disconnected.....');
//     })

// })


let users = 0;
io.on('connection', (item)=>{
    // console.log('User is connected...')

    users++;
    item.emit('customerEvent',`Hii, Welcome to Here....`);
    item.broadcast.emit('customerEvent',`${users} user is connected....`);
    item.on('disconnected',()=>{
        console.log('User is di9sconnected...');
        users--;
        item.broadcast.emit('customerEvent',`${users} user is connected....`);
    })
});

server.listen(port,()=>{
    console.log('Server started.... at http://localhost:1234');
});