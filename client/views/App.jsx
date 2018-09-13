import React from 'react'
import Routes from '../config/router.jsx'
import { Link } from 'react-router-dom'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Link to='/list'>首页</Link>
        <br />
        <Link to='/detail'>detail</Link>
        <Routes />
      </div>
    )
  }
}