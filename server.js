const http = require("http");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");

const server = http.createServer((req, res) => {
  const reqUrl = req.url;
  const filePath = reqUrl === "/" ? "index.html" : reqUrl;
  const contentType =
    mime.lookup(path.join(__dirname, filePath)) || "text/index";

  fs.readFile(path.join(__dirname, filePath), (err, data) => {
    if (err) {
      res.writeHead(404, { "content-type": "text/html" });
      res.end("<h1>404 Page Not Found</h1>");
      return;
    }
    res.writeHead(200, { "content-type": contentType });
    res.end(data);
  });
});

server.listen(5000, () => console.log("The server is running on port 5000"));
