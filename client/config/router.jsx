import React from 'react'
import {
  Route,
  Redirect
} from 'react-router-dom'
import TopicDetail from '../views/topic-detail/index.jsx'
import TopicList from '../views/topic-list/index.jsx'


export default () => [
  <Route path='/' render={()=><Redirect to='/list' />} key='/' exact />,
  <Route path='/list' component={TopicList} key='/list' />,
  <Route path='/detail' component={TopicDetail} key='/detail' />,
]