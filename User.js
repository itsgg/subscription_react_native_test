import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { View, Text } from 'react-native';

export const CURRENT_USER_QUERY = gql`
  query currentUser {
    currentUser {
      id
      mobile
      name
    }
  }
`;

const User = () => {
  const { data, error, loading } = useQuery(CURRENT_USER_QUERY);

  if (error) {
    console.error(error);
    return <Text>{JSON.stringify(error)}</Text>;
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
};

export default User;
