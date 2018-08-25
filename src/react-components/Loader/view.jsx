import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { CenterDivOnScreen } from '../commonstyles'
import recordRender from '../recordrender'
const localRecordRender = false

export default props => {
  if (process.env.NODE_ENV !== 'production') {
    recordRender(localRecordRender, 'Loader')
  }
  if (props.busyCounter > 0) {
    return <CenterDivOnScreen><CircularProgress size={50} thickness={5} /></CenterDivOnScreen>
  } else {
    return null
  }
}
