import { ApolloClient, from, InMemoryCache } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from 'apollo-upload-client';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, uploadLink]) 
});

export default client;