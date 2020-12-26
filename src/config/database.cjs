require('dotenv').config();

module.exports = {
  development: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: false,
    port: process.env.DB_PORT,
    define: {
      timestamps: true,
      underscored: true,
    },
  },
  production: {
    dialect: process.env.DB_DIALECT,
    use_env_variable: 'DATABASE_URL',
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
  },
};
