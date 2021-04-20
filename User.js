import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useSubscription } from '@apollo/react-hooks';
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

const SCRATCH_CARD_CREATED_SUBSCRIPTION = gql`
  subscription scratchCardCreated {
    scratchCardCreated {
      id
      stamp {
        name
        id
        imageUrl
        __typename
      }
      __typename
    }
  }
`;

const User = () => {
  // const { data, error, loading } = useQuery(CURRENT_USER_QUERY);
  const { data, error, loading } = useSubscription(
    SCRATCH_CARD_CREATED_SUBSCRIPTION,
  );

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
