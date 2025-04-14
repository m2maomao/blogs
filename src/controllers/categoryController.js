const categoryService = require('../services/categoryService');

// 获取所有分类
const listCategories = async(req, res) => {
  const { data, error } = await categoryService.getCategories();
  
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

// 创建分类
const createCategory = async(req, res) => {
  const { name, description } = req.body;
  
  const { data, error } = await categoryService.createCategory({ name, description });
  
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
  listCategories,
  createCategory
};