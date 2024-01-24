const mongoose = require('mongoose');

const TenantSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  subscriptionStatus: {
    type: String,
    enum: ['active', 'inactive', 'trial'], // 例如
    default: 'trial'
  },
  subscriptionEndDate: {
    type: Date,
    default: null
  },
  // 可以根据需要添加更多字段，如联系信息、配置选项等
  contactInfo: {
    address: String,
    phone: String
  },
  config: {
    // 任何特定于租户的配置
  },
  // ...其他字段
}, { timestamps: true });

const Tenant = mongoose.model('Tenant', TenantSchema);

module.exports = Tenant;
