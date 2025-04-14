const db = require('../utils/db');

// 获取所有分类
const getCategories = async() => {
  try {
    const sql = `SELECT * FROM categories`;
    const data = await db.query(sql);
    
    return {
      data,
      error: null
    };
  } catch (err) {
    console.error('获取分类列表错误:', err);
    return {
      data: null,
      error: '获取分类列表失败'
    };
  }
}

// 创建分类
const createCategory = async(categoryData) => {
  const { name, description } = categoryData;
  
  if (!name) {
    return {
      data: null,
      error: '分类名称不能为空'
    };
  }
  
  try {
    const sql = `INSERT INTO categories (name, description) VALUES (?, ?)`;
    const result = await db.query(sql, [name, description]);
    
    if (result.affectedRows === 0) {
      return {
        data: null,
        error: '创建分类失败'
      };
    }
    
    // 返回新建的分类数据
    const { data } = await getCategoryById(result.insertId);
    return {
      data,
      error: null
    };
  } catch (err) {
    console.error('创建分类错误:', err);
    return {
      data: null,
      error: '创建分类失败'
    };
  }
}

// 根据ID获取分类
const getCategoryById = async(id) => {
  try {
    const sql = `SELECT * FROM categories WHERE id = ?`;
    const [data] = await db.query(sql, [id]);
    
    if (!data) {
      return {
        data: null,
        error: '分类不存在'
      };
    }
    
    return {
      data,
      error: null
    };
  } catch (err) {
    console.error('获取分类错误:', err);
    return {
      data: null,
      error: '获取分类失败'
    };
  }
}

module.exports = {
  getCategories,
  createCategory,
  getCategoryById
};