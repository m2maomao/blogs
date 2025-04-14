const blogService = require('../services/blogService');

// 获取博客列表数据
const listBlogs = async(req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const categoryId = req.query.categoryId ? parseInt(req.query.categoryId) : null;
  
  const { data, error } = await blogService.getBlogList(page, pageSize, categoryId);
  if(error) {
    return res.status(404).json({
      success: false,
      message: error
    });
  }
  res.json({
    success: true,
    data
  });
}

// 获取博客详情
const getBlogDetail = async(req, res) => {
  const { id } = req.params;

  if(!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: '无效的博客ID'
    });
  }
  
  const { data, error } = await blogService.getBlogById(Number(id));

  if(error) {
    return res.status(404).json({
      success: false,
      message: error
    });
  }

  res.json({
    success: true,
    data
  });
}

// 创建新博客
const createNewBlog = async (req, res) => {
  const blogData = req.body;
  const { data, error } = await blogService.createBlog(blogData);
  
  if(error) {
    return res.status(400).json({
      success: false,
      message: error
    });
  }
  
  res.json({
    success: true,
    data
  });
}

// 更新博客
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  
  if(!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: '无效的博客ID'
    });
  }
  
  const { data, error } = await blogService.updateBlog(Number(id), updateData);
  
  if(error) {
    return res.status(400).json({
      success: false,
      message: error
    });
  }
  
  res.json({
    success: true,
    data
  });
}

// 删除博客
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  
  if(!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: '无效的博客ID'
    });
  }
  
  const { data, error } = await blogService.deleteBlog(Number(id));
  
  if(error) {
    return res.status(400).json({
      success: false,
      message: error
    });
  }
  
  res.json({
    success: true,
    data
  });
}

module.exports = {
  listBlogs,
  getBlogDetail,
  createNewBlog,
  updateBlog,
  deleteBlog
};