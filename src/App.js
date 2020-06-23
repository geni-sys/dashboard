import React from "react";

// "COMPONENTS"
import Header from "./components/Header";
import Home from "./pages/Home";

const App = (props) => (
  <div className="App">
    <Header />
    <Home configs={props} />
  </div>
);

export default App;
