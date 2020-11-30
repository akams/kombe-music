/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import { formatForPlayer as format } from '../../helpers/datetime';

import junglePicture from '../../assets/images/default/jungle-0.jpg';

class PlayList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { musicList, index, playing, played, duration, clickAudio } = this.props;

    const currentTime = duration * played;

    if (musicList.length === 0) {
      return <div>On waiting</div>;
    }
    return (
      <div className="play-list">
        {musicList.map((music, key = 0) => (
          <Row
            role="button"
            key={key}
            onClick={() => clickAudio(key)}
            className={`track ${index === key && !playing ? 'current-audio' : ''}${
              index === key && playing ? 'play-now' : ''
            }`}
          >
            <Col md="3" xs="3">
              {music.imgUrl ? (
                <img className="track-img" src={music.imgUrl} alt="short icon song" />
              ) : (
                <img className="track-img" src={junglePicture} alt="default short icon song" />
              )}
            </Col>
            <Col md="3" xs="3">
              <div className="track-discr">
                <span className="track-name">{music.name}</span>
                <span className="track-author">{music.author}</span>
              </div>
            </Col>
            <Col md="6" xs="6" className="text-right">
              <span className="track-duration">
                {index === key ? (
                  <time dateTime={`P${Math.round(currentTime)}S`}>{format(currentTime)}</time>
                ) : (
                  music.duration
                )}
              </span>
            </Col>
          </Row>
        ))}
      </div>
    );
  }
}

export default PlayList;
