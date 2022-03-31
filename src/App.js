import React, { useEffect, useState, useContext, useMemo, useRef } from "react";
import "./App.css";
import { getRandomWorks } from "./getRandomWorks";

import ArtCard from "./ArtCard.js";
import "./scss/App.scss";

import Flickity from 'react-flickity-component';
import '../node_modules/flickity/css/flickity.css';

import 'react-slideshow-image/dist/styles.css'

import { Slide } from 'react-slideshow-image';

function useTraceUpdate(props) {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
    } else {
      console.log('no props changed');
    }
    prev.current = props;
  });
}

const ThingsContext = React.createContext([{}, () => {}])

function App() {

  const [randomWorks, setRandomWorks] = useState([]);
  const [batchLength, setBatchLength] = useState(10);
  const savedWorks = useRef({});
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

  const Carousel = React.memo(props => {
    // useTraceUpdate(props);
    let flktyRef;

    // let thingsContext = useContext(ThingsContext);
    const randoms = props.randomWorks;
    const setWorksIter = props.setWorksIter;
    // let savedWorks = thingsContext.savedWorks;
    // let setSavedWorks = thingsContext.setSavedWorks;
    console.log(randomWorks);

    const testWorksIter = useRef(0);
    // const [savedWorks, setSavedWorks] = useState({});

    function handleWorksSave() {
      // console.log(randoms[testWorksIter.current].id in savedWorks);
      // if ( !(randoms[testWorksIter.current].id in savedWorks) ) {
      //   setSavedWorks({...savedWorks, [randoms[testWorksIter.current].id] : randoms[testWorksIter.current]});
      // }
      // console.log(savedWorks);
      // setSavedWorks({'yes':'no'});
      console.log('works saved')
    }

    useEffect(() => {
      const slideHandler = e => {
        console.log(flktyRef.selectedIndex);
        testWorksIter.current = flktyRef.selectedIndex;
        console.log(testWorksIter.current);
      }

      flktyRef.on('change', slideHandler);
      return () => {
        flktyRef.off('change');
      };

    }, [flktyRef])


    return (<>
      <Flickity flickityRef={(fr) => flktyRef = fr} imagesLoaded={false} disableImagesLoaded={true} lazyLoad={true}>
          {randoms.map((item, index) => <ArtCard {...item} batchLength={batchLength} key={item.id} index={index} />)}
      </Flickity>
      <button className="save-button" onClick={handleWorksSave}>Save work</button>
    </>)
  })

  const SlideShow = (props) => {
    useTraceUpdate(props);

    const testWorksIter = useRef(0);

    function handleWorksSave() {

      if ( !(props.randomWorks[testWorksIter.current].id in props.savedWorks) ) {
        props.savedWorks.current = {...props.savedWorks.current, [props.randomWorks[testWorksIter.current].id]: props.randomWorks[testWorksIter.current]}
      }

      console.log(props.savedWorks.current)
    }

    function handleSlideChange(oldIndex, newIndex) {
      // console.log(oldIndex, newIndex);
      testWorksIter.current = newIndex;
    }

    return (<>
      <div className="slideshow-wrapper">
        <Slide easing="ease" transitionDuration={400} onChange={handleSlideChange} autoplay={false}>
          {props.randomWorks.map((item, index) => <ArtCard {...item} batchLength={batchLength} key={item.id} index={index} />)}
        </Slide>
      </div>
      <button className="save-button" onClick={handleWorksSave}>Save work</button>
    </>)
  }

  return (
    <div className="App">
        <header className="App-header">
          {randomWorks.length > 0
            ? <SlideShow randomWorks={randomWorks} savedWorks={savedWorks}/>
            : <div>loading</div>
          }
          <button className="reload-works" onClick={handleWorksReload}>Reload</button>
          <div>{Object.keys(savedWorks).length - 1}</div>
        </header>
    </div>
  );
}

export default App;
