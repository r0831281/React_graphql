import { View, Text, FlatList } from 'react-native';

import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

import configData from "./config.json";

const client = new ApolloClient({
  uri: configData.qlendpoint,
  headers: {
    'x-hasura-admin-secret': configData.qlkey
  },
  cache: new InMemoryCache()
});

const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      id
      code
      name
    }
  }
`;

function ListContinents() {
  const { data, loading } = useQuery(GET_CONTINENTS);

  if (loading) return <Text>Loading...</Text>

  return (
    <FlatList
      data={data.continents}
      renderItem={({ item }) => <Text>{item.name}</Text>}
      keyExtractor={(item, index) => index}
    />
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={{ margin: 100 }}>
        <ListContinents />
      </View>
    </ApolloProvider>
  );
}