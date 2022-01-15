import WebSocket from "ws";
import * as http from 'http';

export function wsServer(server:any) {
    const wss = new WebSocket.Server({ server });
wss.on('connection', (ws: WebSocket) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    for (let index = 0; index < 10; index++) {
        ws.send('Hi there, I am a WebSocket server'+index);
        
    }

    //send immediatly a feedback to the incoming connection    
    // ws.send('Hi there, I am a WebSocket server');
});
server.listen(process.env.PORT_WS, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
}
