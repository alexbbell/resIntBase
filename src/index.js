import React, {Component} from "react";

import { createRoot}  from 'react-dom/client';
//import App from './App'
import {BrowserRouter , Routes, Route, Link, Switch } from "react-router-dom";

import MyForm from "./Components/Myform";
import Preform from "./Components/Preform";
import Developers from "./Components/Developers";
import Vitamins from "./Components/Vitamins";
import AddVitamin from "./Components/AddVitamin";

import Listing from "./listing";
import "./styles.scss";
import AddDeveloper from "./Components/AddDeveloper";

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
        <Link to="/developers">Developers</Link> | 
        <Link to="/adddeveloper">Add new developers</Link> | 
        <Link to="/vitamins">Vitamins</Link> | 
        <Link to="/addvitamin">Add new vitamin</Link> | 

          <Link to="/">Invoices</Link> |{" "}

 


      </nav>
      <Routes>
      <Route path="/" element={<Listing />} />
      <Route path="/preform" element={<Preform />} />
      <Route path="/listing" element={<MyForm />} />
      <Route path="/vitamins" element={<Vitamins />} />
      <Route path="/addvitamin" element={<AddVitamin />} /> 
      <Route path="/developers" element={<Developers />} />
      <Route path="/adddeveloper" element={<AddDeveloper />} />

      </Routes>
    </BrowserRouter>
  </>
  );



