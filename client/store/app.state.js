import { 
  observable,
  computed,
  action
} from 'mobx'

export default class AppState {
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
