import { EventEmitter } from 'events';
import Dispatcher from '../Dispatcher';

const CHANGE_EVENT = 'CHANGE';

export default class BaseStore extends EventEmitter {
  constructor() {
    super()

    this._dispatchToken = Dispatcher.register(this.handleAction.bind(this))
  }

  get dispatchToken() {
    return this._dispatchToken;
  }

  handleAction(action) { }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb)
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }
}
