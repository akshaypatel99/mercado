import express from 'express';
import apolloServer from './graphql';

const app = express();

async function startServer() {
  await apolloServer.start();
  
  apolloServer.applyMiddleware({ app });
}

startServer();

export default app;