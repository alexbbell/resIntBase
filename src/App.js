import React, {Component } from "react";

function App( {name, callback}) {
   let add = (x, y) => x + y;
   var att = [1, 2,4,5, 6]
   console.log(...att)

   return (
      <div ref={callback}>
         <h1>Hello {name}! !</h1>
      </div>
   )
 }

export default App;