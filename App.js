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
import ScratchCard from './ScratchCard';

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
        <Text>Apollo Ready</Text>
        <User />
        <ScratchCard />
      </ApolloProvider>
    );
  }
};

export default Main;
