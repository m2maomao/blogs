const handleBlogRoute = require('./src/routes/blog');
console.log('handleBlogRoute: ', handleBlogRoute);
const serverHandler = (req, res) => {
  // 设置响应格式
  res.setHeader('Content-Type', 'application/json');
  
  const url = req.url;
  req.path = url.split('?')[0];

  const blogData = handleBlogRoute(req, res);
  if (blogData) {
    res.end(
      JSON.stringify(blogData)
    )
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain'});
  res.write('404 Node Found');
  res.end();
}

module.exports = serverHandler;