import React from 'react'
import { observer, inject } from 'mobx-react'
import { PropTypes } from 'prop-types'
import Helmet from 'react-helmet'
// import { AppState } from '../../store/app.state'

@inject('appState') @observer
class TopicList extends React.Component {
  // static propTypes = {
  //   appState: PropTypes.instanceOf(AppState).isRequired
  // }

  bootstrap() {  // 初始化，getInitialState
    return new Promise(resolve => {
      setTimeout(() => {
        this.props.appState.changeName('这里变化了')
        this.props.appState.count = 66
        resolve()
      })
    })
  }

  changeName = e => {
    this.props.appState.changeName(e.target.value)
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>topic list</title>
          <meta name="description" content="topic list" />
        </Helmet>
        <input type='text' onChange={this.changeName} defaultValue={this.props.appState.name} />
        <span>{this.props.appState.msg}</span>
      </div>
    )
  }
  
}

export default TopicList