import React from 'react';
import './scss/ArtCard.scss'

export default function ArtCard(props) {

  const {image, title, artist, dateText, medium, index, batchLength} = props;

  return (
    <div className="card-outer-wrapper">
      <div className="card-container">
        <img className="card-artwork" src={image} />
        <h4 className="artwork-title">{title}</h4>
        <div className="artist-name">{artist}</div>
        {dateText && medium && <div className="medium">{dateText} {dateText && medium && '-'} <i>{medium}</i></div>}
        <div className="batch-count">{index + 1} / {batchLength}</div>
      </div>
    </div>
  )
}
