const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Tenant = require('../models/Tenant'); // 租户模型
const { JWT_SECRET } = process.env;

const userController = {
  register: async (req, res) => {
    try {
      const tenantID = uuidv4(); // 生成唯一的tenantID
      const { username, email, password /* 其他可能的字段 */ } = req.body;
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
     
      // 创建新租户记录
      const newTenant = new Tenant({ _id: tenantID, /* 其他租户信息 */ });
      await newTenant.save();

      // 创建新用户
      const newUser = new User({
        // 用户信息
        username:username,
        email:email,
        password:hashedPassword,
        tenantID: tenantID // 存储tenantID与用户关联
      });

      // 保存用户
      await newUser.save();
       // 返回成功响应或者其他逻辑
       res.status(201).json({
        success: true,
        message: 'User successfully registered',
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          tenantID: newUser.tenantID,
          // ...返回其他需要的用户信息
        }
      });
      
    } catch (error) {
      // 处理错误
    }
  },

  login: async (req, res) => {
    try {
      // 用户验证逻辑
      // ...
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      // 处理错误
      res.status(500).json({
        success: false,
        message: 'Error registering user',
        error: error.message
      });
    }
  },

  protected: (req, res) => {
    res.json({ message: '成功访问受保护的路由' });
  }
};

module.exports = userController;
