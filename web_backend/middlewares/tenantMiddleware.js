const { connectTenantDb } = require('../utils/tenantUtils');

const tenantMiddleware = (req, res, next) => {
  const tenantId = req.header('X-Tenant-ID');
  if (!tenantId) {
    return res.status(400).send('Tenant ID is missing');
  }

  req.tenantDb = connectTenantDb(tenantId);
  next();
};

module.exports = tenantMiddleware;
