import React from 'react'
import PlayerActions from '../actions/PlayerActions'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>Lorem ipsum Sed adipisicing ad ex id fugiat reprehenderit veniam non et mollit ea ad velit proident in qui quis amet amet esse mollit cupidatat labore ullamco in enim ut irure in sunt dolor enim adipisicing cupidatat.</p>

        <button onClick={PlayerActions.playSoundcloud.bind(PlayerActions, 'https://soundcloud.com/tellison/tact-is-dead')}>Tast Is Dead</button>&nbsp;
        <button onClick={PlayerActions.playSoundcloud.bind(PlayerActions, 'https://soundcloud.com/tellison/04-collarbone')}>Collarbone</button>

        <p>Lorem ipsum Sed adipisicing ad ex id fugiat reprehenderit veniam non et mollit ea ad velit proident in qui quis amet amet esse mollit cupidatat labore ullamco in enim ut irure in sunt dolor enim adipisicing cupidatat.</p>
      </div>
    );
  }
}
