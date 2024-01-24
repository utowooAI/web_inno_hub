// backend_server.js 
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const userRoutes = require('./routers/userRoutes');
const { jwtStrategy } = require('./config/passport');
const tenantMiddleware = require('./middlewares/tenantMiddleware');

// ...其他依赖

const app = express();


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// multi-tenant middleware
//app.use(tenantMiddleware);

// Passport middleware
app.use(passport.initialize());
passport.use(jwtStrategy);

// User routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});