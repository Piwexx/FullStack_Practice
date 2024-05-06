// Import the 'http' module
const http = require('http')

// Define the port number the server will listen on
const port = 3000

// Create the HTTP server
const server = http.createServer((req, res) => {
  // Set the response HTTP header with a status code of 200 and Content-Type as plain text
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  console.log(req.url)
  // Write the response body
  res.end('Hello, World!\n')
})


// Start listening on the specified port
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
