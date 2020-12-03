/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from 'react-loader-spinner';

import { formatForPlayer as format } from '../../helpers/datetime';

import junglePicture from '../../assets/images/default/jungle-0.jpg';

class PlayList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { musicList, index, playing, played, duration, clickAudio, fetchMoreDataFunction, hasMore } = this.props;

    const currentTime = duration * played;

    return (
      <div id="scrollableZone" className="play-list">
        <InfiniteScroll
          dataLength={musicList.length}
          next={fetchMoreDataFunction}
          hasMore={hasMore}
          loader={
            <div className="styleContentScroll">
              <Loader type="ThreeDots" color="#00BFFF" height={60} width={60} />
            </div>
          }
          scrollableTarget="scrollableZone"
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Hey! Vous avez tout vu</b>
            </p>
          }
        >
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
        </InfiniteScroll>
      </div>
    );
  }
}

export default PlayList;
