const express = require('express');
const app = express();

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 路由
const blogRouter = require('./src/routes/blog');
const categoryRouter = require('./src/routes/category');

app.use('/api/blog', blogRouter);
app.use('/api/category', categoryRouter);

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: '服务器内部错误'
  });
});

// 404处理
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '资源未找到'
  });
});

module.exports = app;