import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import { FloatClear } from '../../commonstyles'
import OutstandingItems from '../OutstandingItems'
import recordRender from '../../recordrender'
import { localRecordRender } from '../'

const TITLENEWTODO = 'Type new todo.'
const TITLEENTERKEY = 'Hit the enter key to save.'
const ENTERKEY = 'Enter'

const TodoEditContainer = styled.div`
  height: 60px;
  border-bottom: 1px solid RGB(200,200,200);
  @media (max-width: 270px) {
    width: 250px;
  }
`

const TextFieldContainer = styled.div`
  padding-left: 6px;
  padding-top: 6px;
  width:75%;
  float:left;
`

const textControlStyles = {
  textEdit: {
    width: '100%',
    marginTop: '10px',
    marginBottom: '-10px'
  }
}

const TodoEdit = ({
  todoEditDisabled,
  classes,
  text,
  saveTodo,
  updateText
}) => {
  if (process.env.NODE_ENV !== 'production') {
    recordRender(localRecordRender, 'TodoEdit')
  }
  return (
    <TodoEditContainer>
      <TextFieldContainer>
        <TextField
          disabled={todoEditDisabled}
          placeholder={TITLENEWTODO}
          onChange={e => updateText(e.target.value)}
          value={text}
          id='TodoEdit'
          onKeyPress={e => e.key === ENTERKEY ? saveTodo() : {}}
          title={TITLEENTERKEY}
          className={classes.textEdit}
        />
      </TextFieldContainer>
      <OutstandingItems />
      <FloatClear />
    </TodoEditContainer>
  )
}

export default withStyles(textControlStyles)(TodoEdit)
