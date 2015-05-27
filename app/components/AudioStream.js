import React from 'react';

export default class AudioStream extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.audio = document.createElement('audio');
  }

  // This could probably be changed to have some sort of "prop diff"
  // rather than all these if statements checking for a change
  componentDidUpdate(prevProps, _) {
    const {src, playing, autoplay, volume, muted} = this.props;

    console.log(src, prevProps.src, this.audio.src)
    if(src !== prevProps.src || src !== this.audio.src) {
      this.audio.src = src;
    }

    if(playing !== prevProps.playing){
      if(playing) {
        this.play();
      } else {
        this.stop();
      }
    }

    if(autoplay !== prevProps.autoplay) {
      if(autoplay) {
        this.play();
      }
    }

    // FIXME: Check volume is an integer from 0-100
    if(volume !== prevProps.volume) {
      this.audio.volume = volume;
    }

    if(muted !== prevProps.muted) {
      this.audio.muted = muted;
    }
  }

  play() {
    if (this.props.src !== this.audio.src) {
      this.audio.src = this.props.src;
    }

    if ("production" !== process.env.NODE_ENV && !this.audio.src) {
      console.warn("Warning, playback was attempted on an AudioStream without a src attribute")
    }

    this.audio.play();
  }

  stop() {
    // Pause the playback
    this.audio.pause();

    // Setting the audio src to an empty string effectively
    // says "stop downloading this stream", which means that
    // when we next receive a play event, we start from the
    // current position in the stream, not the position where
    // we paused.
    this.audio.src = '';
  }

  get currentTime() {
    return this.audio.currentTime;
  }

  get buffered(){
    return this.audio.buffered;
  }

  // TODO: This doesn't really do what you'd want it to, as
  // it won't cause an update to trigger in your UI, despite
  // it changing. Instead, you should really use an event for
  // this and state in your UI.
  // get canPlay() {
  //   // HAVE_ENOUGH_DATA
  //   // We define playability as whether or not we have enough
  //   // data that play() will actually play.
  //   return this.audio.readyState === 4;
  // }

  render() {
    return null;
  }
}
