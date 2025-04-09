// 创建服务器
const http = require('http');
const PORT = 8080;

const serverHandler = require('../app');
const server = http.createServer(serverHandler);
server.listen(PORT, () => {
  console.log('server running at port 8080...')
})