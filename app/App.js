import React from 'react'
import { Link, RouteHandler } from 'react-router'
import PlayerStore from './stores/PlayerStore';
import StreamPlayer from './components/StreamPlayer';
import SoundCloudPlayer from './components/SoundCloudPlayer';


window.__PlayerStore__ = PlayerStore;

export default class App extends React.Component {
  constructor() {
    super();

    this.state = this._getStateFromStores();
  }

  _getStateFromStores() {
    return {
      showSoundcloudPlayer: PlayerStore.fromSoundcloud
    };
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

  render() {
    return (
      <div style={{padding: '30px'}}>
        <StreamPlayer />

        <hr />
        <ul>
          <li><Link to="home">Home</Link></li>
          <li><Link to="about">About</Link></li>
        </ul>

        <div>
          <RouteHandler />
        </div>

        <hr />
        { this.state.showSoundcloudPlayer ? <SoundCloudPlayer /> : false }
      </div>
    );
  }
}
