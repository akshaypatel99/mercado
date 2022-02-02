import express, { Request, Response } from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import validateTokensMiddleware from './middleware/validateTokens';
import { port } from './config/environment';
import schema from './graphql/';
import connectDB from './db';

async function startApolloServer(schema) {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    introspection: true,
    context: ({ req, res }) => ({ req, res }),
  });
  
  await server.start();

  const corsOptions = {
    credentials: true,
    origin: [process.env.DEVELOPMENT_URL, process.env.PRODUCTION_URL, process.env.APOLLO_URL]
  };

  app.use(cors(corsOptions))
  app.use(cookieParser());
  app.use(validateTokensMiddleware);
  app.use(graphqlUploadExpress());
  server.applyMiddleware({
    app,
    cors: false
  });

  await connectDB();

  await new Promise<void>(resolve => httpServer.listen(port, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer(schema);