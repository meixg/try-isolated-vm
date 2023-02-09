const WebSocket = require('ws');
const ivm = require('isolated-vm');

async function createIsolate(codes, inspector = false) {
    if (inspector) {
        return createIsolateWithInspector(codes)
    }

    const snapshot = new ivm.Isolate.createSnapshot(codes || [])
    const isolate = new ivm.Isolate({snapshot, inspector})
    const context = await isolate.createContext({inspector})
    context.global.setSync('global', context.global.derefInto())

    return {
        context,
        isolate
    }
}

async function createIsolateWithInspector(codes) {
    const isolate = new ivm.Isolate({ inspector: true })
    startInspector(isolate)
    const context = await isolate.createContext({ inspector: true })
    for (const code of codes) {
        const script = await isolate.compileScript(code.code, { filename: code.filename })
        await script.run(context)
    }

    return {
        isolate,
        context
    }
}

function startInspector(isolate) {
    const wss = new WebSocket.Server({ port: 10000 });
    wss.on('connection', function(ws) {
        // Dispose inspector session on websocket disconnect
        let channel = isolate.createInspectorSession();
        function dispose() {
            try {
                channel.dispose();
            } catch (err) {}
        }
        ws.on('error', dispose);
        ws.on('close', dispose);

        // Relay messages from frontend to backend
        ws.on('message', function(message) {
            try {
                channel.dispatchProtocolMessage(message.toString());
            } catch (err) {
                // This happens if inspector session was closed unexpectedly
                ws.close();
            }
        });

        // Relay messages from backend to frontend
        function send(message) {
            try {
                ws.send(message);
            } catch (err) {
                dispose();
            }
        }
        channel.onResponse = (callId, message) => send(message);
        channel.onNotification = send;
    });
    console.log('Inspector: devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:10000');
}

module.exports = {
    createIsolate
}
