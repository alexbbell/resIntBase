import React,  {Component, useState, useEffect} from 'react'
import {Modal, Button} from "react-bootstrap";
import axios from "axios";
import AddVitamin   from './AddVitamin';


const Vitamins = (props) => {


    const host =   'https://localhost:7245/api/Vitamins/';
    //const host =   '/Data/localdata.json'
    const [vitaminsData, setVitaminsData] = useState([]);
    const[showEdit, setShowEdit] = useState(0);
    const[showRemove, setShowRemove] = useState(0);
    const [selectedVitamin, selectVitamin] = useState({});
    const [operationResult, setOperationResult] = useState(null);


    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
          const result = await axios( host);
          if (mounted) {
            setVitaminsData(result.data);
          }
        }
        fetchData();
        return () => {
            mounted = false;
        }
      }, [showEdit, showRemove]);
    


    
      //Show modal
      const handleShow = () => setShowEdit(1);
      //Close  modal
      const handleClose = () => {
          setShowEdit(0);
          setShowRemove(0);
          selectVitamin({});
      }

      const editRow = (developer) => {
        selectVitamin(developer);
        handleShow();
      }

      const confirmRemoveRow = (vitamin) => {
        selectVitamin(vitamin);
        setShowRemove(1);
      }

    const RemoveRow = (vitamin) => {
        console.log('RemoveRow', vitamin);
        const urlRemove = 'https://localhost:7245/api/Vitamins/' + vitamin.vitaminId;
        axios.delete(urlRemove).then(setOperationResult('Succesfully removed')).catch(err => { setOperationResult('Error: ' + err) });
        console.log(vitamin)
        selectVitamin({});
        handleClose();
        setOperationResult('');
    }
    
  return (
      <>
          <h1>Vitamins</h1>

          <span>show: {showEdit}</span>
          <div>
              <Button onClick={handleShow}
                  type="button" data-target="#exampleModal" className="btn btn-success" data-toggle="modal" >Add New record</Button>
          </div>

          <Modal show={showEdit}>
              <Modal.Dialog>
                  <Modal.Header closeButton onClick={handleClose} >
                      <Modal.Title>{selectedVitamin.name}</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                      <AddVitamin vitamin={selectedVitamin} />
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
                      <Modal.Title>{selectedVitamin.title}</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                      <span>Do you really want to remove <strong>{selectedVitamin.title}</strong>?</span>
                  </Modal.Body>

                  <Modal.Footer>
                      <Button onClick={handleClose} variant="secondary">Cancel</Button>
                      <Button variant="primary" onClick={ () => {
                                    RemoveRow(selectedVitamin)
                         }
                      }>Remove</Button>
                      <br />
                      <span>{operationResult}</span>
                  </Modal.Footer>
              </Modal.Dialog>
          </Modal>

          <div key="1" className="row">
              <div className="col-6 ">
                  <table className="table table-striped">
                      <thead>
                          <tr>
                              <td>#</td>
                              <td>Title</td>
                              <td>Edit</td>
                              <td>Remove</td>
                          </tr>
                      </thead>
                      <tbody>
                      
                          {vitaminsData.map(vitamin => (
                              <tr key={vitamin.vitaminId}>
                                  <td>{vitamin.vitaminId}</td>
                                  <td>
                                  <div onClick={() => {
                                           handleShow();
                                           editRow(vitamin);
                                      }}>{vitamin.title}</div>
                                      <br />
                                      <span>Страна: {vitamin.rastvor}</span></td>
                                  <td>
                                      <div onClick={() => {
                                           handleShow();
                                           editRow(vitamin);
                                      }}>edit</div></td>
                                  <td>
                                      <div onClick={() => {
                                           confirmRemoveRow(vitamin);
                                      }}>remove</div></td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>

              <div className="col-6 ">

              </div>
          </div>
      </>

  )
}

export default Vitamins