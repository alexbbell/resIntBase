import React, {Component, useState, useEffect  } from "react";
//import 'core-js/actual';
import "regenerator-runtime/runtime";
import axios from "axios";
import {Modal, Button} from "react-bootstrap";
// import MyForm from "./Components/Myform";
import Preform from "./Components/Preform";
import useFetch from './context/useFetch';


//import  './litedbApi'

const Listing = () => {

    const host =   'https://localhost:7245/api/Premixes/';
    const [premixData, setPremixData] = useState( [] );
    const[show, setShow] = useState(0);
    const [selectedPremix, choosePremix] = useState({}); 

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(host);
            let newArray = [];
            result.data.forEach(element => {
                newArray.push(
                    {
                        'id': element.premixId,
                        'title': element.title,
                        'vid': element.vid
                    }
                );
            });
            setPremixData(newArray);
        };
        fetchData();
    }, []);
    
    


    const handleShow = () => setShow(1);
    const handleClose = () => {
        choosePremix( {
            'title' : '',
            'vid': '',
            'tu' : ''
        });
        setShow(0);
    }

    const editRow = (item) => {
        choosePremix(item);
        return item;
    }
    return (
        <>
        <h1>Listing of premixes</h1>
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
                {premixData.map(premix => (
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

                    <Modal show={show}>
                        <Modal.Dialog>
                            <Modal.Header closeButton onClick={handleClose} >
                                <Modal.Title>Modal title</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <Preform premix={selectedPremix} />
                            </Modal.Body>

                            <Modal.Footer>
                                <Button onClick={handleClose} variant="secondary">Close</Button>
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