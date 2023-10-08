import React from "react";
import ReactDOM from "react-dom";

export default function App(props) {
    return <h1>Hello</h1>
}

const appDiv = ReactDOM.createRoot(document.getElementById("app"));

appDiv.render(<App />);