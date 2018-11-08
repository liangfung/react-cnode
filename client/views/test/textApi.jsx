import React from 'react'
import axios from 'axios'

export default class extends React.Component {
  render() {
    return (
      <div>
        <button href="javascript:;" onClick={this.getTopics}>test topics</button>
        <button href='javascript:;' onClick={this.login}>test login</button>
        <button href="javascript:;" onClick={this.markAll}>mark all</button>
      </div>
    )
  }

  getTopics = () => {
    axios.get('/api/topics', {})
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  login = () => {
    axios.post('/api/user/login', { accessToken: 'baed47d2-c2b4-4e4c-8888-89ba10ac6435' })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  markAll =() => {
    axios.post('api/message/mark_all?needAccessToken=true')
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
}