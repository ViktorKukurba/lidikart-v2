const express = require("express");
const app = express();
const path = require("path");

const distination = path.resolve(__dirname, 'dist/lidikart-v2');

app.use(express.static(distination));
app.get("/*", function(req, res) {
  res.sendFile(path.join(distination, "index.html"))
});

app.listen(process.env.PORT || 8080)

console.log("Listening");
