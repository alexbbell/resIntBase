import React, { useState, useEffect, useContext  } from "react";
//import 'core-js/actual';
import "regenerator-runtime/runtime";
import axios from "axios";
import {Modal, Button} from "react-bootstrap";
import Preform from "./Components/Preform";

import { fetchDevelopers, fetchVitamins, fetchKinds, fetchAges, mainUrl}  from './fakeApi.js'
import { UserContext } from "./context/UserContext";

//import  './litedbApi'

const Listing = () => {

    const msg = useContext(UserContext)
    const host =   mainUrl + '/api/Premixes/';
    const [premixData, setPremixData] = useState( [] );
    const[show, setShow] = useState(0);
    const[showRemove, setShowRemove] = useState(0);

    const [selectedPremix, choosePremix] = useState({}); 
    const [operationResult, setOperationResult] = useState(null);
    
    
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
    }, [showRemove]);
    
    


    const handleShow = () => setShow(1);
    const handleClose = () => {
        choosePremix( {
            'title' : 'newitem',
            'vid': '',
            'tu' : ''
        });
        setShow(0);
        setShowRemove(0);
        setOperationResult(null);

    }

    const editRow = (item) => {
        choosePremix(item);
        return item;
    }


    const confirmRemoveRow = (item) => {
        choosePremix(item);
        setShow(0);
        setShowRemove(1);
    }

    const RemoveRow = (item) => {
        console.log('RemoveRow', item);
        const urlRemove = mainUrl + '/api/Premixes/' + item.id;
        
        axios.delete(urlRemove)
        .then(() => {
            setOperationResult('Succesfully removed');
            choosePremix({});

            const timer = setTimeout(() => {
                handleClose();
              }, 1000);

        })
        .catch(err => 
            {
                setOperationResult('Error of removing: ' + err)
            });
        setOperationResult(null);

        //handleClose();
        //setShowRemove(0);
    }
    return (
        <>
            <div className="row">
                <div className="col-10">

                    <h1>Listing of premixes</h1>
                    <span>show: {show}</span>
                    <div>
                        <Button onClick={handleShow}
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
                                                <div onClick={() => {
                                                    handleShow();
                                                    editRow(premix);
                                                }}>edit</div></td>
                                           <td>
                                                <div onClick={() => {
                                                    confirmRemoveRow(premix);
                                                }}>remove</div></td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="col-10 ">

                            <Modal show={show} size="xl">
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



                            <Modal show={showRemove}>
                                <Modal.Dialog>
                                    <Modal.Header closeButton onClick={handleClose} >
                                        <Modal.Title>{selectedPremix.title}</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        {(() => {
                                            if (!operationResult) {
                                                return (
                                                    <span>Do you really want to remove <strong>{selectedPremix.title}</strong>?</span>
                                                )
                                            }
                                            else {
                                                return (
                                            <div>{operationResult}</div>
                                                )
                                            }

                                            return null;
                                        })()}
                                        
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button onClick={handleClose} variant="secondary">Cancel</Button>
                                        <Button variant="primary" onClick={() => {
                                            RemoveRow(selectedPremix)
                                        }
                                        }>Remove</Button>
                                        <br />
                                    </Modal.Footer>
                                </Modal.Dialog>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Listing