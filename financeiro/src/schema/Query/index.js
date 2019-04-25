import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Query {
    precoItem(id: ID!): PrecoItem
  }

  type PrecoItem {
    valor: Float
  }
`;

export const resolvers = {
  Query: {
    precoItem: async () => {
      console.log('teste');
      const preco = { valor: 20.45 };
      return preco;
    },
  },
};