import React from 'react'
import shallowEqual from 'react/lib/shallowEqual'

import PlayerActions from '../actions/PlayerActions'
import PlayerStore from '../stores/PlayerStore'

export default class StreamPlayer extends React.Component {
  constructor() {
    super();
    this.state = this._getStateFromStores();
    this.audio = document.createElement('audio');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState);
  }

  _getStateFromStores(){
    return {
      isPlaying: PlayerStore.fromStream && PlayerStore.isPlaying,
      isPaused: PlayerStore.fromStream && !PlayerStore.isPlaying
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

  handleClick() {
    if(this.state.isPlaying) {
      PlayerActions.pause();
    } else {
      PlayerActions.playStream();
    }
  }

  render() {
    if(this.state.isPlaying){
      this.audio.src = 'http://berlincommunityradio.out.airtime.pro:8000/berlincommunityradio_a';
      this.audio.play();
    } else {
      this.audio.pause();
      this.audio.src = '';
    }

    return (
      <div>
        <p>StreamPlayer for Berlin Community Radio</p>
        <button onClick={this.handleClick.bind(this)}>{ this.state.isPlaying ? 'Pause' : 'Play' }</button>
      </div>
    );
  }
}
