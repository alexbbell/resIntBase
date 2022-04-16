import React, {Component, useState, useEffect  } from "react";
import 'core-js/actual';
import "regenerator-runtime/runtime";
import axios from "axios";
import {Modal, Button} from "react-bootstrap";
import MyForm from "./myForm";

//import  './litedbApi'

const Listing = () => {

     const host =   'https://localhost:7245/api/Premix/';
    //const host =   '/Data/localdata.json'
    const [data, setData] = useState({ rows: [] });
    const[show, setShow] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios( host);
          setData(result.data);
        };
    
        fetchData();
      }, []);
    
    


    const handleShow = () => setShow(1);
    const handleClose = () => setShow(0);
    return (
        <>
        <h1>Listing</h1>
        <span>show: {show}</span>
        <div>
            <Button onClick={handleShow} 
                type="button" data-target="#exampleModal" className="btn btn-success" data-toggle="modal" >Add New record</Button>
        </div>
        
        
        
        <div className="row">
            <div className="col-6 offset-1">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <td>Title</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                {data.rows.map(item => (
                    <tr key={item.id}><td>
                    <a href={item.id}>{item.title}</a>
                    <br />
                    <span>Вид: {item.vid}</span></td>
                    <td>
                    <a href="">edit</a></td>

                    </tr>
                ))}
                </tbody>
                </table>
    </div>
    </div>

            <Modal  show={show}>
                <Modal.Dialog>
                    <Modal.Header closeButton onClick={handleClose} >
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <MyForm data />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={handleClose} variant="secondary">Close</Button>
                        <Button variant="primary">Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </>
    )
}

export default Listing