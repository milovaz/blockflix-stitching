import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import helmet from 'helmet';
import schema from './schema';

const playground = {
  settings: {
    'editor.cursorShape': 'line',
  },
};
class Server {
  constructor() {
    this.express = express();
    this.express.use(helmet());
    this.createServerApollo();
  }

  async createServerApollo() {
    const apolloServer = new ApolloServer({
      // eslint-disable-next-line no-unused-vars
      context: async ({ req }) => {
        return {};
      },
      schema,
      playground,
      uploads: false,
      introspection: true,
    });

    apolloServer.applyMiddleware({ app: this.express, path: '/' });
  }
}

export default new Server();