import React, { Component } from "react";
import ReactDOM from "react-dom";
import Pagination from "./components/Pagination";

const App = () => {
  return (
    <div>
      <p>React here!</p>
      <Pagination/>
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
