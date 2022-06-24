import React, { useEffect } from "react"
import Blob from "./Components/Blob.js"
import './App.css';
import QuizzPage from "./Components/QuizzPage.js";

function App() {
  return (
    <div className="App">
      <QuizzPage />
      <div className="overflowHidden">
        <Blob className="blob-one"/>
        <Blob className="blob-two"/>
      </div>
    </div>
  )
}

export default App;
