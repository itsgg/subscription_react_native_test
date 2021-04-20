/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { View, Text } from 'react-native';
import ApolloClient from './apollo';
import User from './User';

const Main = () => {
  const [client, setClient] = React.useState(client);

  React.useEffect(() => {
    const client = ApolloClient();
    setClient(client);
  }, []);

  if (!client) {
    return (
      <View>
        <Text>Hello from Ganes</Text>
      </View>
    );
  } else {
    return (
      <ApolloProvider client={client}>
        <User />
        <Text>Apollo Ready</Text>
      </ApolloProvider>
    );
  }
};

export default Main;
