import React, {useState, useEffect  } from "react";
import 'core-js/actual';
import "regenerator-runtime/runtime";
import axios from "axios";

//import  './litedbApi'

const Listing = () => {

     const host =   'https://localhost:7245/api/Premix/';
    //const host =   '/Data/localdata.json'
    const [items, setItems] = useState({rows: []});
    const [status, setStatus] = useState('')
    const [data, setData] = useState({ rows: [] });

    useEffect(() => {
        const fetchData = async () => {
          const result = await axios( host);
    
          setData(result.data);
        };
    
        fetchData();
      }, []);
    
    

    // const showItems  = async(items) => {
    //         return items
    //         }
    //showItems(items);
//sendRequest();

    // async function RenderListing(items) {
    //     const result = Object.keys(await items).map(t => {
    //         <div key={t.title}>{t.title}</div>
    //     });
    //      result;
    // }
    return (
        <>
        <h1>Listing</h1>
        {/* <div>{ RenderListing(items)}</div> */}
        <div><a href="addnew">Add New record</a></div>
        <div className="row">
            <div className="col-6 offset-1">
        <table className="table table-striped">

      {data.rows.map(item => (
          <tr><td>
          <a href={item.id}>{item.title}</a>
          <br />
          <span>Вид: {item.vid}</span></td>
          <td>
          <a href="">edit</a></td>

        </tr>
      ))}
      </table>
      </div>
    </div>
        </>
    )
}

export default Listing;