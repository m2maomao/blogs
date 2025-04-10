const { SuccessModel } = require("../model/responseModel");
const { getList, getDetail } = require('../controllers/blog');

// 处理博客相关的路由
const handleBlogRoute = (req, res) => {
  // 定义处理路由的逻辑
  const method = req.method;
  
  // 博客列表路由
  if (method === 'GET' && req.path === '/api/blog/list') {
    const {author = '', keyword = ''} = req.query;
    const listData = getList(author, keyword);
    return new SuccessModel(listData)
  }
  // 博客详情路由
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const { id } = req.query;
    const detailData = getDetail(id)
    return new SuccessModel(detailData);
  }
  // 新建博客路由
  if (method === 'POST' && req.path === '/api/blog/new') {
    return {
      message: '新建博客的接口'
    }
  }
  // 更新博客路由
  if (method === 'POST' && req.path === '/api/blog/update') {
    return {
      message: '更新博客的接口'
    }
  }
  // 删除博客路由
  if (method === 'POST' && req.path === '/api/blog/delete') {
    return {
      message: '删除博客的接口'
    }
  }
}

module.exports = handleBlogRoute;