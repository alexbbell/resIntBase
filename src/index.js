import React, {Component} from "react";

import { createRoot}  from 'react-dom/client';
//import App from './App'
import {BrowserRouter , Routes, Route, Link, Switch } from "react-router-dom";

import MyForm from "./Components/Myform";
import PreForm from "./Components/Preform";
import Listing from "./listing";
import "./styles.scss";

//import App from './App.js';
const container = document.getElementById('root');
const root = createRoot(container);


root.render (
  //    <App name="new User!" callback={ () => console.log('block rendered')} />
  <>
    <div>
      <h1>Bookkeeper</h1>

    </div>
    <BrowserRouter basename="/">
    <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >

        <Link to="/listing">Listing</Link> | 
          <Link to="/preform">PreForm</Link> | 


          <Link to="/">Invoices</Link> |{" "}

 


      </nav>
      <Routes>
      <Route path="/" element={<Listing />} />

      <Route path="/preform" element={<PreForm />} />


      <Route path="/listing" element={<MyForm />} />

      </Routes>
    </BrowserRouter>
  </>
  );





// const root = ReactDom.createRoot(document.getElementById("root"));
// root.render(
//   <React>
//     <App />
//   </React>
// );

