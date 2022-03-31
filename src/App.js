import React, { useEffect, useState, useRef, useCallback } from "react";
import "./App.css";
import { getRandomWorks } from "./getRandomWorks";

import ArtCard from "./ArtCard.js";
import "./scss/App.scss";

import Flickity from 'react-flickity-component';
import '../node_modules/flickity/css/flickity.css';

import 'react-slideshow-image/dist/styles.css'

import { Slide } from 'react-slideshow-image';


function App() {

  const [randomWorks, setRandomWorks] = useState([]);
  const [batchLength, setBatchLength] = useState(10);

  const [worksIter, setWorksIter] = useState(0);

  useEffect(() => {

    getRandomWorks(batchLength).then(function(data) {
        setRandomWorks(data);
        setBatchLength(data.length);
    });

  }, [batchLength]);

  function handleWorksReload() {
    setRandomWorks([]);
    getRandomWorks(batchLength).then(function(data) {
        setRandomWorks(data);
        setBatchLength(data.length);
        setWorksIter(0);
    });
  }



  const Carousel = ({collection}) => {

    let flktyRef;
    const [testworksIter, settestWorksIter] = useState(0);
    const [savedWorks, setSavedWorks] = useState({});


    useEffect(() => {
      const slideHandler = e => {
        settestWorksIter(testworksIter => flktyRef.selectedIndex);
      }

      flktyRef.on('change', slideHandler);
      return () => {
        flktyRef.off('change');
      };

    }, [flktyRef])

    function handleWorksSave() {
      if ( !(randomWorks[testworksIter].id in savedWorks) ) {
        setSavedWorks({...savedWorks, [randomWorks[testworksIter].id] : randomWorks[testworksIter]})
      }
    }

    const SaveButton = React.memo(() => {
      return <button className="save-button" onClick={handleWorksSave}>Save work</button>
    })


    return (
      <>
      <Flickity flickityRef={(fr) => flktyRef = fr} imagesLoaded={false} disableImagesLoaded={true} lazyLoad={true} worksIter={worksIter}>
          {collection.map((item, index) => <ArtCard {...item} batchLength={batchLength} key={item.id} index={index} />)}
      </Flickity>
      <SaveButton />
      </>
    );
  }

  const SlideShow = ({collection}) => {

    function handleSlideChange(oldIndex, newIndex) {
      // console.log(oldIndex, newIndex);
      setWorksIter(newIndex);
    }

    return (
      <div className="slideshow-wrapper">
        <Slide easing="ease" transitionDuration={400} onChange={handleSlideChange} >
          {collection.map((item, index) => <ArtCard {...item} batchLength={batchLength} key={item.id} index={index} />)}
        </Slide>
      </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        {randomWorks.length
          ? <>
              <Carousel collection={randomWorks} />

            </>
          : <div>loading</div>
        }
        <button className="reload-works" onClick={handleWorksReload}>Reload</button>
      </header>
    </div>
  );
}

export default App;
