const WebSocket = require("ws")

const wss = new WebSocket.Server({ port: 8080 })

// ws --> single connection
//wss --> connect to the actual server

wss.on("connection", (ws) => {
  console.log("New client connected!")
  ws.send("Welcome to the WebSocket server!")
  ws.on("message", (data) => {
    const message = data.toString()
    console.log(`Clint has sent us:${message}`)
    // receive the data and send it back to the clint upper case
    ws.send(message.toUpperCase())
  })
  ws.on("close", () => {
    console.log("Clint has disconnected.")
  })
})

// // Create WebSocket connection.
// const socket = new WebSocket("ws://localhost:8080")

// // Connection opened
// socket.addEventListener("open", (event) => {
//   socket.send("Hello Server!")
// })

// // Listen for messages
// socket.addEventListener("message", (event) => {
//   console.log("Message from server ", event.data)
// })
