import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./HomePage";
import { BrowserRouter } from "react-router-dom";


const App = () => {
  return (
  <div className="center">
  <BrowserRouter>
    <HomePage />
  </BrowserRouter>
  </div>
  )
};

const appDiv = ReactDOM.createRoot(document.getElementById("app"));
appDiv.render(<App />);

export default App;