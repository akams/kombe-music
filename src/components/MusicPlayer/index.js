/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { FaBackward, FaForward, FaPlay, FaPause } from 'react-icons/fa';

import { formatForPlayer as format } from '../../helpers/datetime';

import './index.scss';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      musicList: [],
      pip: false,
      playing: false,
      controls: false,
      light: false,
      volume: 0.8,
      muted: false,
      played: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false,
    };
    this.audioRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { musics } = this.props;
    if (musics !== prevProps.musics) {
      console.log('has change--->>', { musics });
      this.handleFetchData(musics);
    }
  }

  handleFetchData = (data) => {
    this.setState({ musicList: data });
  };

  handlePlayPause = () => {
    const { playing } = this.state;
    this.setState({ playing: !playing });
  };

  handleStop = () => {
    this.setState({ playing: false });
  };

  handleToggleControls = () => {
    const { controls } = this.state;
    this.setState({
      controls: !controls,
    });
  };

  handleToggleLight = () => {
    const { light } = this.state;
    this.setState({ light: !light });
  };

  handleToggleLoop = () => {
    const { loop } = this.state;
    this.setState({ loop: !loop });
  };

  handleVolumeChange = (e) => {
    this.setState({ volume: parseFloat(e.target.value) });
  };

  handleToggleMuted = () => {
    const { muted } = this.state;
    this.setState({ muted: !muted });
  };

  handleSetPlaybackRate = (e) => {
    this.setState({ playbackRate: parseFloat(e.target.value) });
  };

  handleTogglePIP = () => {
    const { pip } = this.state;
    this.setState({ pip: !pip });
  };

  handlePlay = () => {
    this.setState({ playing: true });
  };

  handleEnablePIP = () => {
    this.setState({ pip: true });
  };

  handlePause = () => {
    this.setState({ playing: false });
  };

  handleSeekMouseDown = () => {
    this.setState({ seeking: true });
  };

  handleSeekChange = (e) => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  handleSeekMouseUp = (e) => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };

  handleProgress = (state) => {
    const { seeking } = this.state;
    if (!seeking) {
      this.setState(state);
    }
  };

  handleEnded = () => {
    const { loop } = this.state;
    this.setState({ playing: loop });
  };

  handleDuration = (duration) => {
    this.setState({ duration });
  };

  ref = (player) => {
    this.player = player;
  };

  nextSong = () => {
    const { musicList, index } = this.state;

    this.setState({
      index: (index + 1) % musicList.length,
    });
  };

  prevSong = () => {
    const { musicList, index } = this.state;
    this.setState({
      index: (index + musicList.length - 1) % musicList.length,
    });
  };

  clickAudio = (key) => {
    this.setState({
      index: key,
    });
  };

  render() {
    const {
      musicList,
      index,
      playing,
      controls,
      light,
      volume,
      muted,
      loop,
      played,
      duration,
      playbackRate,
      pip,
    } = this.state;

    const currentSong = musicList[index];
    const currentTime = duration * played;

    if (musicList.length === 0) {
      return <div>On waiting</div>;
    }

    return (
      <div className="card">
        <div className="current-song">
          <ReactPlayer
            ref={this.ref}
            className="react-player"
            width="100%"
            height="100%"
            url={currentSong.audioUrl}
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
            onSeek={() => console.log('onSeek')}
            onEnded={this.handleEnded}
            onError={() => console.log('onError')}
            onProgress={this.handleProgress}
            onDuration={this.handleDuration}
          />
          <div className="img-wrap">
            <img src={currentSong.imgUrl} alt="img song" />
          </div>
          <span className="song-name">{currentSong.name}</span>
          <span className="song-autor">{currentSong.author}</span>

          <div className="time">
            <div className="current-time">
              <time dateTime={`P${Math.round(currentTime)}S`}>{format(currentTime)}</time>
            </div>
            <div className="end-time">{currentSong.duration}</div>
          </div>
          <div className="timeline">
            <input
              type="range"
              min={0}
              max={0.999999}
              step="any"
              value={played}
              onMouseDown={this.handleSeekMouseDown}
              onChange={this.handleSeekChange}
              onMouseUp={this.handleSeekMouseUp}
            />
          </div>

          <div className="controls">
            <button type="button" onClick={this.prevSong} className="prev prev-next current-btn">
              <FaBackward />
            </button>

            <button type="button" onClick={this.handlePlayPause} className="play current-btn">
              {!playing ? <FaPlay /> : <FaPause />}
            </button>
            <button type="button" onClick={this.nextSong} className="next prev-next current-btn">
              <FaForward />
            </button>
          </div>
        </div>
        <div className="play-list">
          {musicList.map((music, key = 0) => (
            <div
              role="button"
              key={key}
              onClick={() => this.clickAudio(key)}
              className={`track ${index === key && !playing ? 'current-audio' : ''}${
                index === key && playing ? 'play-now' : ''
              }`}
            >
              <img className="track-img" src={music.imgUrl} alt="icon music" />
              <div className="track-discr">
                <span className="track-name">{music.name}</span>
                <span className="track-author">{music.author}</span>
              </div>
              <span className="track-duration">
                {index === key ? (
                  <time dateTime={`P${Math.round(currentTime)}S`}>{format(currentTime)}</time>
                ) : (
                  music.duration
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Player;
