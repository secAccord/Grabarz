import server from "./engine/engine.js";
const PORT = 7001;
server.listen(PORT,()=>{
    console.table({
        "Express App": `http://localhost:${PORT}`,
        "Socket.io": `ws://localhost:${PORT-1}`
    })
})