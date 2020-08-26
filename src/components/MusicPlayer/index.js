import React from 'react';
import { Link } from 'react-router-dom'
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Slider, Direction, PlayerIcon } from 'react-player-controls'
import ReactPlayer from 'react-player'
import Duration from './Duration'
import ProgressBar from './Slider'
import { Container, Row, Col } from 'reactstrap';

import './index.css'

class MusicPlayer extends React.Component {

  state = {
    url: null,
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false
  }

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false
    })
  }

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  handleStop = () => {
    this.setState({ url: null, playing: false })
  }

  handleToggleControls = () => {
    const url = this.state.url
    this.setState({
      controls: !this.state.controls,
      url: null
    }, () => this.load(url))
  }

  handleToggleLight = () => {
    this.setState({ light: !this.state.light })
  }

  handleToggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }

  handleVolumeChange = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  handleToggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }

  handleSetPlaybackRate = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }

  handleTogglePIP = () => {
    this.setState({ pip: !this.state.pip })
  }

  handlePlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }

  handleEnablePIP = () => {
    console.log('onEnablePIP')
    this.setState({ pip: true })
  }

  handlePause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }

  handleSeekMouseDown = e => {
    console.log('handleSeekMouseDown ==>', e.target.value)
    this.setState({ seeking: true })
  }
  
  handleSeekChange = e => {
    console.log('handleSeekChange ==>', e.target.value)
    this.setState({ played: parseFloat(e.target.value) })
  }
  
  handleSeekMouseUp = e => {
    console.log('handleSeekMouseUp ==>', e.target.value)
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  handleProgress = state => {
    // console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  handleEnded = () => {
    console.log('onEnded')
    this.setState({ playing: this.state.loop })
  }

  handleDuration = (duration) => {
    // console.log('onDuration', duration)
    this.setState({ duration })
  }

  ref = player => {
    this.player = player
  }


  render() {
    const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state;

    let IconPlayPause = (playing) => {
      if (playing) {
        return <PlayerIcon.Pause width={32} height={32} style={{ marginRight: 32 }} onClick={this.handlePlayPause} />;
      }
      return <PlayerIcon.Play width={32} height={32} style={{ marginRight: 32 }} onClick={this.handlePlayPause} />;
    }

    return (
      <div className="music-player-panel">
        <section className="panel-content">
          <div className="content-left">
            <div className="content">
              <div className="img-content" style={{
                backgroundImage: `url("https://res.cloudinary.com/ehsanahmadi/image/upload/v1573758778/Sirvan-Khosravi-Dorost-Nemisham_glicks.jpg")`
              }} />
              <span className="audio-title" title="Dorost Nemisham - Sirvan Khosravi">Dorost Nemisham - Sirvan Khosravi</span>
            </div>
          </div>
          <div className="content-middle">
            <section className='section'>
              <div className='player-wrapper'>
                <ReactPlayer
                  ref={this.ref}
                  className='react-player'
                  width='100%'
                  height='100%'
                  url={url}
                  pip={pip}
                  playing={playing}
                  controls={controls}
                  light={light}
                  loop={loop}
                  playbackRate={playbackRate}
                  volume={volume}
                  muted={muted}
                  onReady={() => console.log('onReady')}
                  onStart={() => console.log('onStart')}
                  onPlay={this.handlePlay}
                  onEnablePIP={this.handleEnablePIP}
                  onDisablePIP={this.handleDisablePIP}
                  onPause={this.handlePause}
                  onBuffer={() => console.log('onBuffer')}
                  onSeek={e => console.log('onSeek', e)}
                  onEnded={this.handleEnded}
                  onError={e => console.log('onError', e)}
                  onProgress={this.handleProgress}
                  onDuration={this.handleDuration}
                />
              </div>

              <Row>
                <Col>
                  {IconPlayPause(playing)}
                </Col>
              </Row>
              <Row>
                <Col xs="2"><Duration seconds={duration * played} /></Col>
                <Col className="p-0">
                  <input
                    className="w-100"
                    type='range' min={0} max={0.999999} step='any'
                    value={played}
                    onMouseDown={this.handleSeekMouseDown}
                    onChange={this.handleSeekChange}
                    onMouseUp={this.handleSeekMouseUp}
                  />
                </Col>
                <Col xs="2"><Duration seconds={duration} /></Col>
              </Row>
            </section>
            <section className='section'>
              <table>
                <tbody>
                  <tr>
                    <th>Custom URL</th>
                    <td>
                      <input ref={input => { this.urlInput = input }} type='text' placeholder='Enter URL' />
                      <button onClick={() => this.setState({ url: this.urlInput.value })}>Load</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
          <div className="content-right">
            <Row>
              <Col xs="2"><span>Volume</span></Col><Col><input type='range' min={0} max={1} step='any' value={volume} onChange={this.handleVolumeChange} /></Col>
            </Row>
            <Row>
              <Col xs="2"><span>Loop</span> <input id='loop' type='checkbox' checked={loop} onChange={this.handleToggleLoop} /></Col>
            </Row>
          </div>
        </section>
      </div>
    )
  }
}

export default (MusicPlayer);