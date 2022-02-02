import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;

const env = {
  development: process.env.NODE_ENV === 'development',
  test: process.env.NODE_ENV === 'test',
  staging: process.env.NODE_ENV === 'staging',
  production: process.env.NODE_ENV === 'production',
}

const mongo = {
  url: process.env.DATABASE_URL
}

const jwtAccessSecret = process.env.JWT_ACCESS_SECRET
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET


export { port, env, mongo, jwtAccessSecret, jwtRefreshSecret };