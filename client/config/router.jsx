import React from 'react'
import {
  Route,
  Redirect
} from 'react-router-dom'
import TopicDetail from '../views/topic-detail/index.jsx'
import TopicList from '../views/topic-list/index.jsx'
import TestApi from '../views/test/textApi.jsx'


export default () => [
  <Route path='/' render={()=><Redirect to='/list' />} key='/' exact />,
  <Route path='/list' component={TopicList} key='/list' />,
  <Route path='/detail' component={TopicDetail} key='/detail' />,
  <Route path='/test' component={TestApi} key='/test' />
]