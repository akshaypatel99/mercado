import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import schema from './schema';
import { jwtSecret } from '../config/environment';

const apolloServer = new ApolloServer({
  schema,
  introspection: true,
  context: ({ req }) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return { user: null };
      }
      const decoded = jwt.verify(token.slice(7), jwtSecret);
      return { user: decoded }
    } catch (error) {
      return { user: null }
    }
  }
});

export default apolloServer;