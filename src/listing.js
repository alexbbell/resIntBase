import React, {Component, useState, useEffect  } from "react";
import 'core-js/actual';
import "regenerator-runtime/runtime";
import axios from "axios";
import {Modal, Button} from "react-bootstrap";
import MyForm from "./Components/MyForm";

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
    const handleClose = () => {
        choosePremix();
        setShow(0);
    }
    const [selectedPremix, choosePremix] = useState(); 
    const editRow = (item) => {
        choosePremix(item);
        return item;
    }
    return (
        <>
        <h1>Listing</h1>
        <span>show: {show}</span>
        <div>
            <Button onClick={handleShow } 
                type="button" data-target="#exampleModal" className="btn btn-success" data-toggle="modal" >Add New record</Button>
        </div>
        
        
        
        <div key="1" className="row">
            <div className="col-6 ">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <td>Title</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                {data.rows.map(premix => (
                    <tr key={premix.id}>
                    <td>{premix.id}</td>
                    <td>
                    <a href={premix.id}>{premix.title}</a>
                    <br />
                    <span>Вид: {premix.vid}</span></td>
                    <td>
                    <div onClick={ () => {
                        handleShow();
                        editRow(premix);
                    } }>edit</div></td>

                    </tr>
                ))}
                </tbody>
                </table>
            </div>

            <div className="col-6 ">

                    <Modal  show={show}>
                        <Modal.Dialog>
                            <Modal.Header closeButton onClick={handleClose} >
                                <Modal.Title>Modal title</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <MyForm premix={selectedPremix} />
                            </Modal.Body>

                            <Modal.Footer>
                                <Button onClick={ handleClose } variant="secondary">Close</Button>
                                <Button variant="primary">Save changes</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal>
                </div>
            </div>

        </>
    )
}

export default Listing