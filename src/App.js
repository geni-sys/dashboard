import React from "react";

// "STYLES"
import "./global.css";

// "COMPONENTS"
import Header from "./components/Header";
import Home from "./pages/Home";

const App = () => (
  <div className="App">
    <Header />
    <Home />
  </div>
);

export default App;
