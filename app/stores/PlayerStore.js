import BaseStore from './BaseStore';
import {PLAY_STREAM, PLAY_SOUNDCLOUD, PLAY, PAUSE, STOP_SOUNDCLOUD} from '../constants';

class PlayerStore extends BaseStore {
  constructor() {
    super();

    this._fromStream = false;
    this._fromSoundcloud = false;
    this._soundcloudUrl = null;

    this._playing = false;
  }

  handleAction(action) {
    var type = action.actionType;
    var changed = false;

    if (type === PLAY_STREAM || type === PLAY_SOUNDCLOUD || type === PLAY) {
      this._playing = true;
      changed = true;
    }

    if (type === PAUSE) {
      this._playing = false;
      changed = true;
    }

    if (type === PLAY_STREAM) {
      this._fromStream = true;
      this._fromSoundcloud = false;
      changed = true;
    }
    if (type === PLAY_SOUNDCLOUD) {
      this._fromStream = false;
      this._fromSoundcloud = true;
      this._soundcloudUrl = action.url;

      changed = true;
    }

    if (type === STOP_SOUNDCLOUD) {
      this._playing = false;
      this._fromSoundcloud = false;
      this._soundcloudUrl = null;

      changed = true;
    }


    if(changed) {
      this.emitChange();
    }
  }

  get isPlaying() {
    return this._playing;
  }

  get fromStream() {
    return this._fromStream;
  }

  get fromSoundcloud() {
    return this._fromSoundcloud;
  }

  get soundcloudUrl() {
    return this._soundcloudUrl;
  }

  get hasSoundcloudUrl() {
    return !!this._soundcloudUrl;
  }
};

export default new PlayerStore();
