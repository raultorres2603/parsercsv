import logo from "./logo.svg";
import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import MainMenu from "./components/MainMenu";

function App() {
  return (
    <div className="App">
      <MainMenu />
    </div>
  );
}

export default App;
