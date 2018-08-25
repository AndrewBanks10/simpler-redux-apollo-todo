import React from 'react'
import { Provider } from 'react-redux'
import store from '../redux/reduxstore'
import MainApp from './MainApp/MainApp'
import { ApolloProvider } from 'react-apollo'
import { hostClient } from '../apollo/apollo-client'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
})

export default () =>
  <Provider store={store}>
    <ApolloProvider client={hostClient}>
      <MuiThemeProvider theme={theme}>
        <MainApp />
      </MuiThemeProvider>
    </ApolloProvider>
  </Provider>
