import React from 'react'
import axios from 'axios'

export default class extends React.Component {
  render() {
    return (
      <div>
        <a href="javascript:;" onClick={this.getTopics}>test topics</a>
        <a href='javascript:;' >test login</a>
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
}