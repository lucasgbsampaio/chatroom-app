module.exports = {
  development: {
    dialect: 'postgres',
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
    use_env_variable: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
};
