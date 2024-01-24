// models/tenantModelFactory.js
const mongoose = require('mongoose');

const createTenantModel = (tenantId, schemaDefinition) => {
  const schema = new mongoose.Schema(schemaDefinition);
  const modelName = 'ModelFor' + tenantId;
  const collectionName = 'collectionFor' + tenantId;

  // 避免重复创建模型
  if (mongoose.models[modelName]) {
    return mongoose.model(modelName);
  }

  return mongoose.model(modelName, schema, collectionName);
};

module.exports = createTenantModel;
