import React from 'react'
import axios from 'axios'
import { observer, inject } from 'mobx-react'
import { PropTypes } from 'prop-types'
import { AppState } from '../../store/app.state'

@inject('appState') @observer
class TopicList extends React.Component {
  static propTypes = {
    appState: PropTypes.instanceOf(AppState).isRequired
  }

  changeName = e => {
    this.props.appState.changeName(e.target.value)
  }

  render() {
    return (
      <div>
        <input type='text' onChange={this.changeName} defaultValue={this.props.appState.name} />
        <span>{this.props.appState.msg}</span>
      </div>
    )
  }
  
}

export default TopicList