 const app = require("./app");
const port = process.env.PORT || 3000;
const http = require("http");
const server = http.createServer(app);


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});