const express = require('express');
const router = express.Router();
const {
  listBlogs,
  getBlogDetail,
  createNewBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');

// 获取博客列表
router.get('/', listBlogs);

// 获取博客详情
router.get('/:id', getBlogDetail);

// 创建新博客
router.post('/', createNewBlog);

// 更新博客
router.put('/:id', updateBlog);

// 删除博客
router.delete('/:id', deleteBlog);

module.exports = router;