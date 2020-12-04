/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { connectInfiniteHits } from 'react-instantsearch-dom';
import Hit from './Hit';

import './index.scss';

class InfiniteHits extends Component {
  sentinel = null;

  componentDidMount() {
    this.observer = new IntersectionObserver(this.onSentinelIntersection);
    this.observer.observe(this.sentinel);
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  onSentinelIntersection = (entries) => {
    const { hasMore, refine } = this.props;
    console.log({ entries, refine, hasMore });
    entries.forEach((entry) => {
      if (entry.isIntersecting && hasMore) {
        refine();
      }
    });
  };

  render() {
    const { hits, hasMore } = this.props;
    let hideComponent = '';
    if (!hasMore) {
      hideComponent = 'ais-InfiniteHits-sentinel-hide';
    }

    return (
      <div className="ais-InfiniteHits">
        <ul className="ais-InfiniteHits-list">
          {hits.map((hit) => (
            <li key={hit.objectID} className="ais-InfiniteHits-item">
              <Hit hit={hit} />
            </li>
          ))}
          <li className={`ais-InfiniteHits-sentinel ${hideComponent}`} ref={(c) => (this.sentinel = c)} />
        </ul>
      </div>
    );
  }
}

export default connectInfiniteHits(InfiniteHits);
