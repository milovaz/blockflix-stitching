import { ApolloServer, mergeSchemas } from 'apollo-server-express';
import express from 'express';
import helmet from 'helmet';
import { loadRemoteSchema } from './loadRemoteSchema';
import { resolvers as FilmeResolvers, typeDef as FilmeSchema } from './schema/Filme';

const {
  URL_FINANCEIRO,
  URL_CATALOGO,
  URL_ESTOQUE
} = process.env;

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
    const schemaFinanceiro = await loadRemoteSchema(URL_FINANCEIRO);
    const schemaCatalogo = await loadRemoteSchema(URL_CATALOGO);
    const schemaEstoque = await loadRemoteSchema(URL_ESTOQUE);

    const schemas = [
      FilmeSchema,
      schemaFinanceiro,
      schemaCatalogo,
      schemaEstoque,
    ];

    const mergedSchemas = mergeSchemas({
      schemas,
      resolvers: [FilmeResolvers],
    });

    const apolloServer = new ApolloServer({
      // eslint-disable-next-line no-unused-vars
      context: async ({ req }) => {
        return {};
      },
      schema: mergedSchemas,
      playground,
      uploads: false,
      introspection: true,
    });

    apolloServer.applyMiddleware({ app: this.express, path: '/' });
  }
}

export default new Server();