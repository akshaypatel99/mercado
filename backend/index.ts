import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import { port } from './config/environment';
import schema from './graphql/';
import connectDB from './db';

async function startApolloServer(schema) {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    introspection: true,
    context: ({ res }) => ({
      res
    })
  });
  
  await server.start();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: ['http://localhost:3000', 'https://studio.apollographql.com']
    }
  });

  await connectDB();

  await new Promise<void>(resolve => httpServer.listen(port, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer(schema);