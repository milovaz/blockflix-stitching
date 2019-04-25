import fetch from 'node-fetch';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { introspectSchema, makeRemoteExecutableSchema } from 'graphql-tools';

export const loadRemoteSchema = async uri => {
  const makeApiAddressLink = () => createHttpLink({ uri, fetch });

  const schema = await introspectSchema(makeApiAddressLink());

  const apiAdrress = makeApiAddressLink();
  
  return makeRemoteExecutableSchema({
    schema,
    link: ApolloLink.from([apiAdrress]),
  });
};

export default loadRemoteSchema;
