import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';

import ArtCard from "./ArtCard.js";
import "./scss/App.scss";

// - SlideShow component that iterates over the random works, generating a slide card for each
// - Passes along the savedWorks to update the artCard when its artwork has been saved
// - Controlled Component behavior, updating the default index with worksIter whenever a save happens

export default function SlideShow(props) {
  const {slideRef, worksIter, randomWorks, savedWorks} = props;

  return (<div className="outer-slideshow-wrapper">
    <div className="slideshow-wrapper">
      <Slide ref={slideRef} easing="ease" defaultIndex={worksIter} transitionDuration={300} autoplay={false}>
        {randomWorks.map((item, index) => <ArtCard {...item} batchLength={randomWorks.length} key={item.id} index={index} savedWorks={savedWorks}/>)}
      </Slide>
    </div>
  </div>)
}
