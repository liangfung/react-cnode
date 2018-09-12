import { 
  observable，
  computed，
  action,
  autorun
} from 'mobx'

class AppState {
  @observable count = 0
  @observable name = 'liangfung'
  @computed get msg() {
    return `my name is ${this.name}, counter: ${this.count}`
  }
  @action add() {
    this.count += 1
  }
}

const appState = new AppState()

autorun(() => {
  console.log(appState.msg)
})

setInterval(appState.add(), 1000)

export default appState
