import React, {Component, useEffect, useState} from 'react'
import { Form, FormGroup, Label, Input, Button } from 'react-bootstrap'

const Rendering = (props) => {

const [arr, serArr] = useState();
const [isloaded, setLoaded] = useState(false);



let instarr = [1,3,2,5,null,9,6,null,7,72,3,4,2,1,8,9,10]
//arr = MakeGraph( instarr);
useEffect( () => {
  serArr(PrintGraph());
  setLoaded(true);

}, [])


const MakeGraph = (arr) => {
    
  let result = new Array();
  result[0] = [(arr[0])];

  let width = 1; //the start width of the tree (beside root)
  let indx = 1; //the index of incoming array
  let curIndx = 0;

  while(indx < arr.length) 
  {
      let curArr = new Array();
      curArr = result[curIndx];

      let newNode = new Array(width*2);
      let newindx = 0;
      for(let q = 0; q < width; q++) {
      
          if(curArr[q] ) 
          {
              newNode[newindx] = arr[indx];
              indx++;
              newindx++;
              newNode[newindx] = arr[indx];
              indx++;
              newindx++;
          }
          else {
              newNode[newindx] = null;
              newindx++;
              newNode[newindx] = null;
              newindx++;
          }

      }
      result.push(newNode);

      curIndx++;
      width = width *2;
  }
  console.log('49', result);
  return result

};

const PrintGraph = () => {
  let inc = [1,2,3, null, 3,4,5,32,434,333,332];
  let rawGraph = MakeGraph(inc);
  let rows =  rawGraph.length;
  let maxWidth = rawGraph[rows-1].length;
  let counter = 0;
  let midWidth = (maxWidth %2 ==0) ? maxWidth /2 : Math.floor(maxWidth / 2);

  const printGraph = new Array(rows).fill('').map( () => new Array(maxWidth).fill('') );

  for(let row = 0; row < rows; row++) {
    for(let col = 0; col < maxWidth; col++) {
      if(col == midWidth - Math.floor(counter / 2)) {
        printGraph[row][col] = inc[counter];
        counter++
        for(let q = col; q < maxWidth; q++) {
          if(q == col + counter * 2) {
            counter++;
            printGraph[row][q+1] = inc[counter];
          }
        }
      }
    }
  }

  console.log('printGraph', printGraph)
  return printGraph;


}



const Rr = () => {
  //let arr = [1,2,3,5,6];

console.log(arr);

  if (isloaded) {

    let maxColumns = arr[arr.length-1].length;

    return (
      <div className='row'>
        {
          arr.map((element, index) => {
            //Добить массив пустыми клетками
            let defaultLength = element.length;
            element.length = maxColumns;
            element.fill(null, defaultLength, maxColumns);

            let mid = ((maxColumns) % 2 ==0) ? maxColumns / 2 : Math.floor(size / 2);

            console.log(element);

              return (
                <div>
                  {/* <RowRender data={element} /> */}
                  {
                        element.map((subel, index) => {
                        return (
                          <>
                           <div key='el' className='boxed'>{subel}</div>
                         </>
                        )
                      })
                    }
                </div>
  
              )


              }

          )
        }
      </div>
    )
    
  }
  else {
    return <div>Loading</div>;
  }
  // let str = arr.forEach(x => {
  //       return (
  //         <div key={x} className="boxed">{x}</div>
  //        )
  //     });
     return str;
}

const Trep = () => {
  return (
    <div> Trep</div>
  )
}
    

  return (
      <>
        <h1>Rendering</h1>
        <div>
          {arr}
          <Rr />
        </div>
        <Trep />
      </>
  )
}


export default Rendering;