import { useEffect } from "react";
import "./App.css";
import { getRandomWorks } from "./getRandomWorks";

function App() {
  useEffect(() => {
    getRandomWorks();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>See README.md for instructions</p>
      </header>
    </div>
  );
}

export default App;
