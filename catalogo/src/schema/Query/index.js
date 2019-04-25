import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Query {
    filmes(input: FilmesInput): FilmesPayload
  }

  input FilmesInput {
    titulo: String
  }

  type FilmesPayload {
    lista: [Filme]
    total: Int
  }

  type Filme {
    id: String
    titulo: String
  }
`;

export const resolvers = {
  Query: {
    filmes: async () => {
      const lista = [{
        id: '1',
        titulo: 'O Auto da Compadecida',
      }, {
        id: '2',
        titulo: 'Central do Brasil',
      }];
      return {
        lista,
        total: lista.length,
      };
    },
  },
};