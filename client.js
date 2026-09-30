const WebSocket = require("ws")
const readline = require("readline")

// create readline interface for user input
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// })
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// connect to the WebSocket server
const ws = new WebSocket("ws://localhost:8080")

// connection open
ws.on("open", () => {
  console.log("connected to the WebSocket server")
  promptForMessage()
})

// listen for the message from the server
ws.on("message", (data) => {
  const message = data.toString()
  console.log(`Server: ${message}`)
})

// Handle errors
ws.on("error", (error) => {
  console.error("WebSocket error: ", error)
})

// Handle connection close
ws.on("close", () => {
  console.log("Disconnected From The Server.")
  // process.exit(0)
})

// Function to prompt user for messages
const promptForMessage = () => {
  rl.question('Enter a message (or "exit" to quit):', (message) => {
    if (message.toLowerCase() === "exit") {
      ws.close()
      rl.close()
      return
    }
    ws.send(message)
    promptForMessage()
  })
}
