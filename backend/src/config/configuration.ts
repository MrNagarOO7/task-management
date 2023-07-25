export default () => ({
  host: process.env.HOST || '0.0.0.0',
  port: parseInt(process.env.PORT, 10) || 3000,
  mongo: {
    uri: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'task123%$#',
    expireIn: process.env.JWT_SIGN_EXPIRES || '1h',
  },
});
