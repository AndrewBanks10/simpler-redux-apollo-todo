import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import recordRender from '../recordrender'
const localRecordRender = false

export default props => {
  if (process.env.NODE_ENV !== 'production') {
    recordRender(localRecordRender, 'Error')
  }
  return (
    <Dialog
      id='error-dialog'
      open={(props.error !== '')}
      onClose={props.clearError}
      aria-labelledby='error-dialog-title'
      aria-describedby='error-dialog-description'
    >
      <DialogTitle id='error-dialog-title'>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='error-dialog-description'>
          {props.error}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button id='error-dialog-ok-button' onClick={props.clearError} color='primary' autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}
