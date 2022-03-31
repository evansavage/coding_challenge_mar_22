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
    getRandomWorks().then(function(data) {
        setRandomWorks(data);
        setWorksIter(0);
    });
  }

  // - Updates worksIter on save to ensure Controlled Component behavior of SlideShow on rerender
  // - Checks worksSaved for current slide artwork id, adds to worksSaved if new
  function handleWorksSave() {
    let slideIndex = slideRef.current.state.index;
    setWorksIter(slideIndex);

    if ( !(randomWorks[slideIndex].id in savedWorks) ) {
      setSavedWorks({...savedWorks, [randomWorks[slideIndex].id]: randomWorks[slideIndex]});
    }
  }

  return (
    <div className="App">
        <header className="App-header">
          {randomWorks.length > 0
            ? <div className="overall-wrapper">
              <SlideShow slideRef={slideRef} randomWorks={randomWorks} savedWorks={savedWorks} setSavedWorks={setSavedWorks} worksIter={worksIter} setWorksIter={setWorksIter} />
              <div className="button-row">
                <div>
                  <Button style={{ color: 'white', borderColor: 'white' }} variant="outlined" className="save-button" onClick={handleWorksSave}><SaveIcon fontSize="large" /></Button>
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
