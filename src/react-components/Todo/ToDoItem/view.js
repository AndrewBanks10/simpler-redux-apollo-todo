import React from 'react'
import styled from 'styled-components'
import Checkbox from '@material-ui/core/Checkbox'
import ActionDelete from '@material-ui/icons/Delete'
import InplaceTextEdit from '../InplaceTextEdit'
import { FloatClear } from '../../commonstyles'
import { withStyles } from '@material-ui/core/styles'
import recordRender from '../../recordrender'
import { localRecordRender } from '../'

const TITLEDELETETODO = 'Delete todo.'
const TITLEEDITTODO = 'Double click to edit todo.'

const TodoEditItem = styled.div`
  padding-top: 0px;
  padding-bottom: 0px;
  border-bottom: 1px solid RGB(220,220,220);  
`

const TodoItem = styled.div`
  padding-top: 14px;
  padding-bottom: 1px;
  border-bottom: 1px solid RGB(220,220,220);  
  &:hover {
    background-color: RGB(240,240,240); 
  }
`

const ItemCheckbox = styled.div`
  float: left;
  padding-left: 0px;
  margin-left: -4px;
  margin-top: -12px;
  opacity: 0.4;
  &:hover {
    opacity: 1.0;
  }
`

const ItemText = styled.div`
  font-size: 16px;
  float: left;
  margin-top:3px;
  ${props => props.completed ? 'opacity: 0.5; text-decoration: line-through;' : ''}
}
`
const ItemDelete = styled.div`
  float: right;
  opacity: 0.0;
  ${TodoItem}:hover & {
    opacity: 0.3;
  }
  ${TodoItem}:hover &:hover {
    opacity: 0.7;
  }
`

const toDoItemStyles = {
  deleteIcon: {
    color: 'RGB(255,0,0)'
  }
}

class ToDoItem extends React.Component {
  render () {
    if (process.env.NODE_ENV !== 'production') {
      recordRender(localRecordRender, 'ToDoItem')
    }
    const {
      id,
      completed,
      text,
      deleteTodo,
      onCheck,
      startEdit,
      editID,
      classes } = this.props
    if (editID === id) {
      return (
        <TodoEditItem>
          <InplaceTextEdit />
        </TodoEditItem>
      )
    }
    return (
      <TodoItem>
        <ItemCheckbox>
          <Checkbox checked={completed} onChange={() => onCheck(id)} />
        </ItemCheckbox>
        <ItemText completed={completed} onDoubleClick={() => startEdit(id)} title={TITLEEDITTODO}>
          {text}
        </ItemText>
        <ItemDelete className={classes.deleteIcon} title={TITLEDELETETODO}>
          <ActionDelete onClick={() => deleteTodo(id)} />
        </ItemDelete>
        <FloatClear />
      </TodoItem>
    )
  }
}

export default withStyles(toDoItemStyles)(ToDoItem)
