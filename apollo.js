import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ActionCable from './ActionCable';
import ActionCableLink from './ActionCableLink';

const AUTH_TOKEN = 'OTpaNmF5aDdoQ1FXSHdDRVlGRGQ5bVpwanM=';
const GRAPHQL_URL = 'https://itsgg.ngrok.io/graphql';
const WEBSOCKET_URL = 'wss://itsgg.ngrok.io/cable';

const Client = () => {
  const httpLink = new HttpLink({
    uri: GRAPHQL_URL,
    headers: {
      'X-Token': AUTH_TOKEN,
    },
  });

  const cable = ActionCable.createConsumer(
    `${WEBSOCKET_URL}?token=${AUTH_TOKEN}`,
  );

  const cableLink = new ActionCableLink({ cable });

  const hasSubscriptionOperation = ({ query: { definitions } }) => {
    return definitions.some(
      ({ kind, operation }) =>
        kind === 'OperationDefinition' && operation === 'subscription',
    );
  };

  const link = ApolloLink.split(hasSubscriptionOperation, cableLink, httpLink);

  const cache = new InMemoryCache();

  return new ApolloClient({
    link,
    cache,
  });
};

export default Client;
