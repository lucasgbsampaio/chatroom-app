require('dotenv').config();

console.log('a');

module.exports = {
  production: {
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
  },
};
