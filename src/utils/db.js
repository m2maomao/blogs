const mysql = require('mysql2/promise');
const config = require('../config');

// 创建连接池
const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: 'myblog',
  port: config.db.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * 执行数据库查询
 * @param {string} sql - SQL语句
 * @param {array} params - 查询参数
 * @returns {Promise<array>} 查询结果
 */
async function query(sql, params) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute(sql, params);
    return rows;
  } catch (err) {
    console.error('数据库查询错误：', err);
    throw err; // 抛出错误由上层处理
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  query
};