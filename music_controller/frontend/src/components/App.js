import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./HomePage";


const App = () => {
  return (
  <div className="center">
    <HomePage />
  </div>
  )
};

const appDiv = ReactDOM.createRoot(document.getElementById("app"));
appDiv.render(<App />);

export default App;