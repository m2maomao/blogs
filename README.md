# 博客管理系统后端

基于Node.js和MySQL的博客管理系统后端API

## API文档

### 博客相关接口

#### 获取博客列表
- 请求方法: GET
- 请求路径: /api/blog
- 请求参数:
  - page: 页码(可选，默认1)
  - pageSize: 每页数量(可选，默认10)
  - categoryId: 分类ID(可选)
- 响应示例:
```json
{
  "success": true,
  "data": {
    "list": [
      {
        "id": 1,
        "title": "博客标题",
        "content": "博客内容",
        "author": "作者",
        "category_id": 1,
        "category_name": "技术"
      }
    ],
    "pagination": {
      "total": 100,
      "page": 1,
      "pageSize": 10
    }
  }
}
```

#### 创建博客
- 请求方法: POST
- 请求路径: /api/blog
- 请求参数:
  - title: 标题(必填)
  - content: 内容(必填)
  - author: 作者(必填)
  - category_id: 分类ID(可选)
- 响应示例:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "新博客标题",
    "content": "新博客内容",
    "author": "作者"
  }
}
```

### 分类相关接口

#### 获取分类列表
- 请求方法: GET
- 请求路径: /api/category
- 响应示例:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "技术",
      "description": "技术类文章"
    }
  ]
}
```

#### 创建分类
- 请求方法: POST
- 请求路径: /api/category
- 请求参数:
  - name: 分类名称(必填)
  - description: 分类描述(可选)
- 响应示例:
```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "生活",
    "description": "生活类文章"
  }
}
```
