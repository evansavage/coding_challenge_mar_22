import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { getRandomWorks } from "./getRandomWorks";

import SlideShow from "./SlideShow.js"

// Imports from material UI
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import RefreshIcon from '@mui/icons-material/Refresh';

function App() {

  // States for the random work objects, saved work objects, and the index of the current batch
  const [randomWorks, setRandomWorks] = useState([]);
  const [savedWorks, setSavedWorks] = useState({});
  const [worksIter, setWorksIter] = useState(0);
  const [disableSave, setDisableSave] = useState(false);

  // slideRef for referencing the nested SlideShow component
  const slideRef = useRef(null);

  useEffect(() => {

    getRandomWorks().then(function(data) {
        setRandomWorks(data);
    });

  }, []);

  // Empties randomWorks to trigger loading render, then refills the state
  function handleWorksReload() {
    setRandomWorks([]);
    setWorksIter(0);
    getRandomWorks().then(function(data) {
        setRandomWorks(data);
        if ( !(data[0].id in savedWorks) ) {
          setDisableSave(false);
        } else {
          setDisableSave(true);
        }
    });
  }

  // - Updates worksIter on save to ensure Controlled Component behavior of SlideShow on rerender
  // - Checks worksSaved for current slide artwork id, adds to worksSaved if new
  function handleWorksSave() {
    let slideIndex = slideRef.current.state.index;
    setWorksIter(slideIndex);
    setDisableSave(true);
    if ( !(randomWorks[slideIndex].id in savedWorks) ) {
      setSavedWorks({...savedWorks, [randomWorks[slideIndex].id]: randomWorks[slideIndex]});
    }
  }

  function handleSlideChange(oldIndex, newIndex) {
    if (randomWorks[newIndex].id in savedWorks) {
      setDisableSave(true);
    } else {
      setDisableSave(false);
    }
  }

  return (
    <div className="App">
        <header className="App-header">
          {randomWorks.length > 0
            ? <div className="overall-wrapper">
              <SlideShow slideRef={slideRef} randomWorks={randomWorks} savedWorks={savedWorks} worksIter={worksIter} onChange={handleSlideChange} />
              <div className="button-row">
                <div>
                  <Button disabled={disableSave} variant="outlined" className="save-button" onClick={handleWorksSave}><SaveIcon fontSize="large" /></Button>
                  <div className="saved-total">{Object.keys(savedWorks).length > 0 ? Object.keys(savedWorks).length: ""}</div>
                </div>
                <Button style={{ color: 'white', borderColor: 'white' }} variant="outlined" className="reload-works" onClick={handleWorksReload}><RefreshIcon fontSize="large" /></Button>
              </div>
              </div>
            : <CircularProgress style={{ color: 'white', borderColor: 'white' }} />
          }
        </header>
    </div>
  );
}

export default App;
