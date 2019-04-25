import { merge } from 'lodash';
import { makeExecutableSchema } from 'apollo-server-express';
import { typeDef as QueryTypeDef, resolvers as QueryResolvers } from './Query';

export const typeDefs = [QueryTypeDef];

export const resolvers = merge(
  QueryResolvers,
);

export default makeExecutableSchema({
  inheritResolversFromInterfaces: true,
  typeDefs,
  resolvers,
});