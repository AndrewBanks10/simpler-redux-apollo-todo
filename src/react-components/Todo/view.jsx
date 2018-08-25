import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import { FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETE } from './filters.js'
import TodoEdit from './TodoEdit'
import TodoList from './TodoList'
import recordRender from '../recordrender'
import { localRecordRender } from './'

const MainSection = styled.div`
  text-align: center;
  font-family: arial;
`

const MainSubSection = styled.div`
  max-width:500px;
  width:100%;
  display: inline-block;
`

const MainHeader = styled.div`
  color:red;
  font-size: 100px;
  text-align: center;
  opacity:0.2;
`

export const TodoForm = () =>
  <div>
    <TodoEdit />
    <TodoList />
  </div>

const Todo = ({ filter, setFilter }) => {
  if (process.env.NODE_ENV !== 'production') {
    recordRender(localRecordRender, 'Todo')
  }
  return (
    <MainSection>
      <MainSubSection>
        <Paper elevation={4}>
          <MainHeader>Todos</MainHeader>
          <AppBar position='static'>
            <Tabs value={filter} onChange={(_event, value) => setFilter(value)}>
              <Tab id={FILTER_ALL} value={FILTER_ALL} label={FILTER_ALL} />
              <Tab id={FILTER_ACTIVE} value={FILTER_ACTIVE} label={FILTER_ACTIVE} />
              <Tab id={FILTER_COMPLETE} value={FILTER_COMPLETE} label={FILTER_COMPLETE} />
            </Tabs>
          </AppBar>
          <TodoForm filter={filter} />
        </Paper>
      </MainSubSection>
    </MainSection>
  )
}

export default Todo
