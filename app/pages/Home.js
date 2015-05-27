import React from 'react'
import PlayerActions from '../actions/PlayerActions'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>This is the home page</h1>

        <button onClick={PlayerActions.playSoundcloud.bind(PlayerActions, 'https://soundcloud.com/tellison/tact-is-dead')}>Tast Is Dead</button>
        <button onClick={PlayerActions.playSoundcloud.bind(PlayerActions, 'https://soundcloud.com/tellison/04-collarbone')}>Collarbone</button>
      </div>
    );
  }
}
