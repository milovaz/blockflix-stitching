import { gql } from 'apollo-server-express';
import mock from './mock';

export const typeDef = gql`
  type Query {
    itemEstoque(id: ID!): ItemEstoque
  }

  type ItemEstoque {
    qtdDisponivel: Int
  }
`;

export const resolvers = {
  Query: {
    itemEstoque: async (parent, { id }) => {
      const item = mock.find(item => item.id_item === id);
      return item;
    },
  },
};