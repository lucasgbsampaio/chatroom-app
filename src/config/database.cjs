module.exports = {
  production: {
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
  },
};
