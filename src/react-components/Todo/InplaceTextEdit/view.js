import React from 'react'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import recordRender from '../../recordrender'
import { localRecordRender } from '../'

const ENTERKEY = 'Enter'

const TextFieldContainer = styled.div`
  margin-left: 44px;
  margin-top: 10px;
  margin-bottom: 9px;
`

const textControlStyles = {
  input: {
    fontSize: '16px'
  },
  textEdit: {
    marginTop: '0px',
    marginBottom: '0px'
  }
}

const InplaceTextEdit = ({
  editText,
  updateEditText,
  saveEdit,
  endEdit,
  editID,
  classes
}) => {
  if (process.env.NODE_ENV !== 'production') {
    recordRender(localRecordRender, 'InplaceTextEdit')
  }
  return (
    <TextFieldContainer>
      <TextField
        id={editID.toString()}
        onChange={e => updateEditText(e.target.value)}
        value={editText}
        autoFocus={true}
        onBlur={endEdit}
        className={classes.textEdit}
        onKeyPress={e => e.key === ENTERKEY ? saveEdit(editID) : {}}
        fullWidth={true}
        InputProps={{
          classes: {
            input: classes.input
          }
        }}
      />
    </TextFieldContainer>
  )
}

export default withStyles(textControlStyles)(InplaceTextEdit)
