import { 
  observable,
  computed,
  action
} from 'mobx'

export default class AppState {
  constructor(initialState = {}) {
    this.name = initialState.name || 'liang'
    this.count = initialState.count || 0
  }
  @observable count
  @observable name
  @computed get msg() {
    return `my name is ${this.name}, counter: ${this.count}`
  }
  @action add() {
    this.count += 1
  }
  @action changeName(value) {
    this.name = value
  }
  toJson() {
    return {
      count: this.count,
      name: this.name
    }
  }
}
