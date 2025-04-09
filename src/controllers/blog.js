// 博客相关方法
const getList = (author, keyword) => {
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

module.exports = {
  getList
};