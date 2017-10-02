import React, {component} from 'react'
import {StyleSheet, Text, View } from 'react-native'
import { gpl, graphql } from 'react-apollo'

const App = (props) => {
  console.log(props.data)
  return (
    <View>
      <Text>Show Movies:</Text>
      <Text>{props.data.movies}:</Text>
      <Text>Show TV Series:</Text>
      <Text>{props.data.tvs}:</Text>
    </View>
  )
}

const myQuery = gpl`
{
movies {
  title
  overview
  poster_path
  popularity
  status
  tag {
    text
  }
},
tvs {
  title
  overview
  poster_path
  popularity
  status
}
}
`

const MyComponentWithData = graphql(myQuery)(App)

export default MyComponentWithData