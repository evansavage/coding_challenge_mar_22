import React from 'react';
import './scss/ArtCard.scss'


// Returns individual art card used in slider

export default function ArtCard(props) {

  const {id, image, title, artist, dateText, medium, index, batchLength, savedWorks} = props;

  return (
    <div className='card-outer-wrapper'>
      <div className='card-container'>
        <img className="card-artwork" src={image} alt={`${title} - ${artist}`}/>
        <h4 className="artwork-title">{title}</h4>
        <div className="artist-name">{artist}</div>
        {dateText && medium && <div className="medium">{dateText} {dateText && medium && '-'} <i>{medium}</i></div>}
        <div className={`batch-count ${id in savedWorks ? "saved" : ""}`}>{index + 1} / {batchLength}</div>
      </div>
    </div>
  )
}
