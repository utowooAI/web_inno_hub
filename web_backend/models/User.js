const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');  // 导入uuid
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  uuid: {
        type: String,
        default: () => uuidv4(),  // 为新用户生成UUID
        unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  tenantID: {
    type: String,
    required: true
  },
  // ...可以根据需要添加更多的用户信息字段，如名字、姓氏等
}, { timestamps: true });

// 密码哈希中间件（在保存前执行）
UserSchema.pre('save', async function (next) {
  const user = this;

  // 只有在密码被修改时才运行
  if (user.isModified('password') || user.isNew) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }
  
  next();
});

// 密码验证方法
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
