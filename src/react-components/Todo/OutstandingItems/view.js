import React from 'react'
import ContentClear from '@material-ui/icons/Clear'
import styled from 'styled-components'
import recordRender from '../../recordrender'
import { localRecordRender } from '../'

const TITLECLEARCOMPLETED = 'Clear Completed Todos.'
const TITLEITEMSLEFT = 'items left'

const Outstanding = styled.div`
  font-size:14px;
  padding-right:6px;
  margin-top:8px;
  @media screen and (max-width: 380px) {
    font-size: 12px;
    margin-top:10px;
  }

  @media screen and (max-width: 324px) {
    font-size: 10px;
    margin-top:12px;
  }

  @media screen and (max-width: 280px) {
    font-size: 8px;
    margin-top:14px;
    padding-right:2px;
  }

  @media screen and (max-width: 270px) {
    padding-right:0px;
    padding-left:0px;
    display: none
  }
`

const Cleared = styled.div`
  color: red;
  margin-top: 8px;
  margin-bottom: -8px;
  text-align: center;
  opacity: 0.3;

  &:hover {
    opacity: 1.0;
  }

  ${props => !props.hasCompleted ? 'visibility:hidden' : 'opacity: 0.3'}
  @media screen and (max-width: 270px) {
    padding-right:0px;
    padding-left:0px;
    display: none
  }
`

const OutstandingContainer = styled.div`
  float:right;
`

const OutstandingItems = ({
  hasCompleted,
  numOutstanding,
  clearCompleted
}) => {
  if (process.env.NODE_ENV !== 'production') {
    recordRender(localRecordRender, 'OutstandingItems')
  }
  return (
    <OutstandingContainer>
      <Cleared onClick={clearCompleted} title={TITLECLEARCOMPLETED} hasCompleted={hasCompleted}>
        <ContentClear />
      </Cleared>
      <Outstanding>
        {`${numOutstanding} ${TITLEITEMSLEFT}`}
      </Outstanding>
    </OutstandingContainer>
  )
}

export default OutstandingItems
