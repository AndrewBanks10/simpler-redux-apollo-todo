import React from 'react'
import ToDoItem from '../ToDoItem'
import styled from 'styled-components'
import { FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETE } from '../filters.js'
import recordRender from '../../recordrender'
import { localRecordRender } from '../'

const TodoListBase = styled.div`
  max-height: calc(100vh - 246px);
  overflow: auto;
`

const TodoList = ({
  filter,
  todos,
  editID,
  deleteTodo,
  onCheck,
  startEdit
}) => {
  if (process.env.NODE_ENV !== 'production') {
    recordRender(localRecordRender, 'TodoList')
  }
  return (
    <TodoListBase>
      {todos.map(todo => {
        if ((filter === FILTER_ALL) || (todo.completed && (filter === FILTER_COMPLETE)) || (!todo.completed && (filter === FILTER_ACTIVE))) {
          return (
            <ToDoItem
              key={todo.id}
              id={todo.id}
              completed={todo.completed}
              text={todo.text}
              editID={editID}
              deleteTodo={deleteTodo}
              onCheck={onCheck}
              startEdit={startEdit}
            />
          )
        }
        return null
      })}
    </TodoListBase>
  )
}

export default TodoList
