import React from 'react'

import ReactSoundplayer from 'react-soundplayer';
const { PlayButton, Timer } = ReactSoundplayer.components;
const { SoundPlayerContainer } = ReactSoundplayer.addons;

import PlayerActions from '../actions/PlayerActions'
import PlayerStore from '../stores/PlayerStore'

const CLIENT_ID = '442e7a3a734d52404c7ba95c5b434ac2';

class CustomPlayer extends React.Component {
    play() {
        let { soundCloudAudio, playing } = this.props;
        if (playing) {
            soundCloudAudio.pause();
        } else {
            soundCloudAudio.play();
        }
    }

    render() {
        let { track, playing } = this.props;

        if (!track) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h3>{track.title} uploaded by {track.user.username}</h3>
                <button onClick={this.play.bind(this)}>{playing ? 'Pause' : 'Play'}</button>
                &nbsp;
                <button onClick={PlayerActions.stopSoundcloud}>Stop</button>
                <p>Audio from <a href="https://soundcloud.com/tellison">Tellison's Soundcloud</a></p>
            </div>
        );
    }
}

export default class SoundcloudPlayer extends React.Component {
  constructor() {
    super();

    this.state = this._getStateFromStores();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.url !== this.state.url) {
      this.playUrl(nextState.url);
    }

    return true;
  }

  playUrl(url) {
    var player = this.refs.player;

    if(player.soundCloudAudio.playing){
      player.soundCloudAudio.pause();
    }

    player.soundCloudAudio.resolve(url, function(data){
      player.setState({ track: data });
      player.soundCloudAudio.play();
    });
  }

  _getStateFromStores() {
    return {
      isPlaying: PlayerStore.fromSoundcloud && PlayerStore.isPlaying,
      isPaused: PlayerStore.fromSoundcloud && !PlayerStore.isPlaying,
      url: PlayerStore.soundcloudUrl
    };
  }

  _onStoreChange() {
    this.setState(this._getStateFromStores());
  }

  componentDidMount() {
    this.changeListener = this._onStoreChange.bind(this);
    PlayerStore.addChangeListener(this.changeListener);

    this.playUrl(this.state.url);
  }

  componentWillUnmount() {
    this.refs.player.soundCloudAudio.pause();
    PlayerStore.removeChangeListener(this.changeListener);
  }

  render() {
    var status;
    if(this.state.isPlaying) {
      status = 'playing';
    }
    if(this.state.isPaused) {
      status = 'paused';
    }

    return (
      <div>
        SoundcloudPlayer; url={this.state.url}, status={status}

        <SoundPlayerContainer ref="player" onStartTrack={PlayerActions.play.bind(PlayerActions)} onStopTrack={PlayerActions.pause.bind(PlayerActions)} clientId={CLIENT_ID}>
                <CustomPlayer />
        </SoundPlayerContainer>
      </div>
    );
  }
}
