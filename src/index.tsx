import React from "react";
import ReactDOM from "react-dom";
import App from "@/components/App";
import './virtual:windi.css'
import "@/styles/global.scss";
import "@/styles/index.scss";

ReactDOM.render(
	// <React.StrictMode>
	<App />,
	// </React.StrictMode>
	document.getElementById("root")
);
