const mongoose = require('mongoose');
const tenants = {};

const connectTenantDb = (tenantId) => {
  if (tenants[tenantId]) {
    return tenants[tenantId];
  }

  const dbURI = `mongodb://localhost:27017/inno_hub_${tenantId}`;
  tenants[tenantId] = mongoose.createConnection(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

  return tenants[tenantId];
};

module.exports = { connectTenantDb };