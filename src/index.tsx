import React from "react";
import ReactDOM from "react-dom";
import App from "@/components/App";
import "@/styles/index.scss";
import "@/styles/tailwind.css";

import './utils/ConstantToMap'

ReactDOM.render(
	// <React.StrictMode>
	<App />,
	// </React.StrictMode>
	document.getElementById("root")
);