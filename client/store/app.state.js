import { 
  observable,
  computed,
  action,
  autorun
} from 'mobx'

export class AppState {
  @observable count = 0
  @observable name = 'liangfung'
  @computed get msg() {
    return `my name is ${this.name}, counter: ${this.count}`
  }
  @action add() {
    this.count += 1
  }
  @action changeName(value) {
    this.name = value
  }
}

const appState = new AppState()

autorun(() => {
  console.log(appState.msg)
})

export default appState
