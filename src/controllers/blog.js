// 博客相关方法
// 获取博客列表数据
const getBlogList = (author, keyword) => {
  // 从数据库里拿数据
  return [
    {
      id: 1,
      title: '标题1',
      content: '内容1',
      author: 'zhangsan',
      createAt: 1744209483584
    },
    {
      id: 2,
      title: '标题2',
      content: '内容2',
      author: 'lisi',
      createAt: 1744209483777
    }
  ]
}
// 获取博客详情
const getBlogDetail = (id) => {
  return {
    id: 1,
    title: '标题1',
    content: '内容1',
    author: 'zhangsan',
    createAt: 1744209483584
  }
}

// 创建新的博客
const createNewBlog = (blogData) => {
  return {
    id: 1
  };
}

// 更新博客
const updateBlog = (id, blogData = {}) => {
  return true;
}

// 删除博客
const deleteBlog = (id) => {
  return true;
}
module.exports = {
  getBlogList,
  getBlogDetail,
  createNewBlog,
  updateBlog,
  deleteBlog
};