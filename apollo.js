import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

const AUTH_TOKEN = 'OTpaNmF5aDdoQ1FXSHdDRVlGRGQ5bVpwanM=';
const GRAPHQL_URL = 'https://itsgg.ngrok.io/graphql';
const WEBSOCKET_URL = 'wss://itsgg.ngrok.io/cable';

const Client = () => {
  const link = new HttpLink({
    uri: GRAPHQL_URL,
    headers: {
      'X-Token': AUTH_TOKEN,
    },
  });

  const wsLink = new WebSocketLink({
    uri: `${WEBSOCKET_URL}?token=${AUTH_TOKEN}`,
    options: {
      reconnect: true,
    },
  });

  const cache = new InMemoryCache();

  return new ApolloClient({
    wsLink,
    link,
    cache,
  });
};

export default Client;
