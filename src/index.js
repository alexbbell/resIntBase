import React, {Component} from "react";

import { createRoot}  from 'react-dom/client';
import App from './App'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./styles.scss";


//import App from './App.js';
const container = document.getElementById('root');
const root = createRoot(container);


root.render (
      <App name="new User!" callback={ () => console.log('block rendered')} />
  );





// const root = ReactDom.createRoot(document.getElementById("root"));
// root.render(
//   <React>
//     <App />
//   </React>
// );

