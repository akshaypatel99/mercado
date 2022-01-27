import express from 'express';
import apolloServer from './graphql';
import { graphqlUploadExpress } from 'graphql-upload';

const app = express();

async function startServer() {
  await apolloServer.start();
  
  app.use(graphqlUploadExpress());
  apolloServer.applyMiddleware({ app });
}

startServer();

export default app;