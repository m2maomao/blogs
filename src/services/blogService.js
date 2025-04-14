const db = require('../utils/db');

/**
 * 获取博客列表
 * @returns {Promise<{data: array|null, errors: string|null}>}
 */
const getBlogList = async(page = 1, pageSize = 10, categoryId = null) => {
  try {
    const offset = (page - 1) * pageSize;
    let whereClause = 'WHERE b.is_deleted = 0';
    const params = []; // 先初始化空数组
    
    if (categoryId) {
      whereClause += ' AND b.category_id = ?';
      params.push(categoryId);
    }
    
    // 添加分页参数
    params.push(BigInt(pageSize), BigInt(offset));
    
    const sql = `
      SELECT b.*, c.name as category_name
      FROM blogs b
      LEFT JOIN categories c ON b.category_id = c.id
      ${whereClause}
      LIMIT ? OFFSET ?
    `;
    
    const countSql = `
      SELECT COUNT(*) as total
      FROM blogs b
      ${whereClause}
    `;
    
    // 传递正确的参数
    const [data, [total]] = await Promise.all([
      db.query(sql, params), // 使用完整的params数组
      db.query(countSql, categoryId ? [categoryId] : []) // 计数查询的参数
    ]);
    
    if(!data || data.length === 0) {
      return {
        data: {
          list: [],
          pagination: {
            total: 0,
            page,
            pageSize
          }
        },
        error: '没有找到博客文章'
      }
    }
    return {
      data: {
        list: data,
        pagination: {
          total: total.total,
          page,
          pageSize
        }
      },
      error: null
    };
  } catch (err) {
    console.error('获取博客列表错误:', err);
    return {
      data: null,
      error: '获取博客列表失败'
    }
  }
};

/**
 * 根据ID获取博客详情
 * @param {number} id - 博客ID
 * @returns {Promise<{data: object|null, error: string|null}>}
 */
const getBlogById = async(id) => {
  try {
    const sql = `SELECT * FROM blogs WHERE id = ? AND is_deleted = 0`;
    const [data] = await db.query(sql, [id]);
    if(!data) {
      return {
        data: null,
        error: '指定的博客不存在'
      }
    }
    return { data, error: null};
  } catch (err) {
    console.error('获取博客详情错误:', err);
    return {
      data: null,
      error: '获取博客详情失败'
    }
  }
};

/**
 * 创建新的博客
 * @param {object} blogData 
 * @returns {Promise<{data: object|null, error: string|null}>}
 */
const createBlog = async(blogData) => {
  const { title, content, author } = blogData;

  // 验证必填字段
  if (!title || !content || !author) {
    return {
      data: null,
      error: '标题、内容和作者均为必填项'
    };
  }

  try {
    const sql = `INSERT INTO blogs (title, content, author) VALUES (?, ?, ?)`;
    const params = [title, content, author];

    const result = await db.query(sql, params);

    if(result.affectedRows === 0) {
      return {
        data: null,
        error: '创建博客失败'
      };
    }
    // 返回新建的博客数据
    return getBlogById(result.insertId);
  } catch (err) {
    console.log('创建博客错误:', err);

    // 处理唯一键冲突等特定错误
    if (err.code === 'ER_DUP_ENTRY') {
      return {
        data: null,
        error: '博客标题已存在'
      }
    }

    return {
      data: null,
      error: '创建博客失败，请稍后再试'
    };
  }
}

/**
 * 更新博客
 * @param {number} id 
 * @param {object} updateData 
 * @returns {Promise<{data: object|null, error: string|null}>}
 */
const updateBlog = async(id, updateData = {}) => {
  const { title, content } = updateData;

  // 验证必填字段
  if (!title && !content) {
    return { data: null, error: '至少需要提供标题或内容更新' }
  }

  try {
    // 先检查博客是否存在
    const { data: existingBlog, error } = await getBlogById(id);
    if (error) {
      return { data: null, error}
    }

    // 构建更新语句
    const updateFields = [];
    const params = [];

    if (title) {
      updateFields.push('title = ?');
      params.push(title);
    }

    if (content) {
      updateFields.push('content = ?');
      params.push(content);
    }

    params.push(id); // WHERE 条件的参数

    const sql = `UPDATE blogs SET ${updateFields.join(', ')} WHERE id = ? AND is_deleted = 0`;
    const result = await db.query(sql, params);

    if(result.affectedRows === 0) {
      return { data: null, error: '更新博客失败，可能是博客不存在或已被删除'};
    }
    // 返回更新后的博客数据 
    return getBlogById(id);
  } catch (error) {
    console.error('更新博客错误:', err);

    // 处理唯一键冲突等特定错误
    if (err.code === 'ER_DUP_ENTRY') {
      return { data: null, error: '博客标题已存在'};
    }

    return { data: null, error: '更新博客失败，请稍后再试' };
  }
}

// 删除博客
const deleteBlog = async(id) => {
  try {
    // 先检查博客是否存在
    const { data: existingBlog, error } = await getBlogById(id);
    if (error) {
      return { data: null, error};
    }

    const sql = `UPDATE blogs SET is_deleted = 1 WHERE id = ?`;
    const result = await db.query(sql, [id]);

    if(result.affectedRows === 0) {
      return { data: null, error: '删除博客失败，可能是博客不存在或已被删除'};
    }
    return { data: { id }, error: null};
  } catch (err) {
    console.error('删除博客错误:', err);
    return { data: null, error: '删除博客失败，请稍后再试'}
  }
}

module.exports = {
  getBlogList,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};