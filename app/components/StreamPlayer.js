import React from 'react'
import shallowEqual from 'react/lib/shallowEqual'

import PlayerActions from '../actions/PlayerActions'
import PlayerStore from '../stores/PlayerStore'
import AudioStream from './AudioStream'

export default class StreamPlayer extends React.Component {
  constructor() {
    super();
    this.state = this._getStateFromStores();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState);
  }

  _getStateFromStores(){
    return {
      isPlaying: PlayerStore.fromStream && PlayerStore.isPlaying,
    }
  }

  _onStoreChange() {
    this.setState(this._getStateFromStores());
  }

  componentDidMount() {
    this.changeListener = this._onStoreChange.bind(this);
    PlayerStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    PlayerStore.removeChangeListener(this.changeListener);
  }

  handlePlaybackToggle() {
    if(this.state.isPlaying) {
      this.refs.player.stop();
      PlayerActions.pause();
    } else {
      this.refs.player.play();
      PlayerActions.playStream();
    }
  }

  render() {
    return (
      <div>
        <p>StreamPlayer for Berlin Community Radio</p>
        <AudioStream ref="player" src="http://berlincommunityradio.out.airtime.pro:8000/berlincommunityradio_a" playing={this.state.isPlaying}/>
        <button onClick={this.handlePlaybackToggle.bind(this)}>
          { this.state.isPlaying ? 'Stop' : 'Play' }
        </button>
      </div>
    );
  }
}
