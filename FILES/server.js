// Import express
const express = require("express");
const app = express();

// create a simple route
app.get("/", (req, res) => {
res.send("helo world from Express!");
});

// start server
app.listen(3000,() => {
console.log("server running on http://localhost:3000");
});

