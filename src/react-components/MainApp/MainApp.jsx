import React from 'react'
import Todo from '../Todo'
import Error from '../Error'
import Loader from '../Loader'
import StateMonitor from '../StateMonitor'

export default () =>
  <div>
    <Loader />
    <Error />
    <Todo />
    {process.env.NODE_ENV === 'production' ? null : <StateMonitor />}
  </div>
