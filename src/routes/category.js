const express = require('express');
const router = express.Router();
const {
  listCategories,
  createCategory
} = require('../controllers/categoryController');

// 获取分类列表
router.get('/', listCategories);

// 创建分类
router.post('/', createCategory);

module.exports = router;