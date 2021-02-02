const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');

const filePath = '/var/log/snort/alert_json.txt';
//const filePath = '/home/nikola/Desktop/nesto.txt';

app.get('/', (req, res) => {
    res.send('<h1>Hey socket<h1>');
});

io.on('connection', (socket) => {
    fs.readFile(filePath, "utf-8", (error, data) => {
        if (error) throw error;
        let split_data = data.split(/\r?\n/);
        socket.emit("alerts", split_data);
    });
    let fsWait = false;
    fs.watch(filePath, (event, filename) => {
        if (filename) {
            if (fsWait) return;
            fsWait = setTimeout(() => {
                fsWait = false;
            }, 100);
            fs.readFile(filePath, "utf-8", (error, data) => {
                if (error) throw error;
                let split_data = data.split(/\r?\n/);
                socket.emit("alerts", split_data);
            });
        }
    });
});


http.listen(3000, () => {
    console.log('listening on port 3000');
});

