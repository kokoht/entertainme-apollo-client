import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql'
})

const client = new ApolloClient({
  networkInterface: networkInterface
})

import App from './src/App'


export default class reactapollo extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View>
          <App/>
        </View>
      </ApolloProvider>  
    )
  }
}

// to eliminate yellow box warning
console.ignoredYellowBox = ['warning: View.protoTypes'];

AppRegistry.registerComponent('reactapollo', () => reactapollo);

