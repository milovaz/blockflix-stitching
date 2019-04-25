import { gql } from 'apollo-server-express';
import { loadRemoteSchema } from '../../loadRemoteSchema';

export const typeDef = gql`
  extend type Filme {
    preco: PrecoItem
    disponibilidade: ItemEstoque
  }
`;

export const resolvers = {
  Filme: {
    async preco(parent, args, context, info) {
      const financeiroSchema = await loadRemoteSchema(process.env.URL_FINANCEIRO);
      return info.mergeInfo.delegateToSchema({
        schema: financeiroSchema,
        operation: 'query',
        fieldName: 'precoItem',
        args: {
          id: parent.id,
        },
        context,
        info,
      });
    },
    async disponibilidade(parent, args, context, info) {
      const itemEstoque = await loadRemoteSchema(process.env.URL_ESTOQUE);
      return info.mergeInfo.delegateToSchema({
        schema: itemEstoque,
        operation: 'query',
        fieldName: 'itemEstoque',
        args: {
          id: parent.id,
        },
        context,
        info,
      });
    },
  },
};