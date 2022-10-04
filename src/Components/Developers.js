import React,  {Component, useState, useEffect} from 'react'
import {Modal, Button} from "react-bootstrap";
import axios from "axios";
import AddDeveloper from './AddDeveloper';


const Developers = (props) => {


    const host =   'https://localhost:7245/api/Developers/';
    //const host =   '/Data/localdata.json'
    const [developersData, setDevelopersData] = useState([]);
    const[showEdit, setShowEdit] = useState(0);
    const[showRemove, setShowRemove] = useState(0);
    
    const [selectedDeveloper, selectDeveloper] = useState({});
    const [operationResult, setOperationResult] = useState(null);


    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
          const result = await axios( host);
          if (mounted) {
            setDevelopersData(result.data);
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
//          choosePremix();
          setShowEdit(0);
          setShowRemove(0);
          selectDeveloper({});
      }

      const editRow = (developer) => {
        console.log(developer)

        selectDeveloper(developer);
        handleShow();
      }

      const confirmRemoveRow = (developer) => {
        selectDeveloper(developer);
        setShowRemove(1);
      }

      const RemoveRow = (developer) => {
          console.log('RemoveRow', developer);
        const urlRemove = 'https://localhost:7245/api/Developers/' + developer.developerId;
        axios.delete(urlRemove).then(setOperationResult('Succesfully removed')).catch(err => {setOperationResult('Error: ' + err)});
        console.log(developer)
        selectDeveloper({});
        handleClose();
        setOperationResult('');
        setShowRemove(0);

      }
    
  return (
      <>
          <h1>Developers</h1>

          <span>show: {showEdit}</span>
          <div>
              <Button onClick={handleShow}
                  type="button" data-target="#exampleModal" className="btn btn-success" data-toggle="modal" >Add New record</Button>
          </div>

          <Modal show={showEdit}>
              <Modal.Dialog>
                  <Modal.Header closeButton onClick={handleClose} >
                      <Modal.Title>{selectedDeveloper.name}</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                      <AddDeveloper developer={selectedDeveloper} />
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
                      <Modal.Title>{selectedDeveloper.name}</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                      <span>Do you really want to remove <strong>{selectedDeveloper.name}</strong>?</span>
                  </Modal.Body>

                  <Modal.Footer>
                      <Button onClick={handleClose} variant="secondary">Cancel</Button>
                      <Button variant="primary" onClick={ () => {
                                    RemoveRow(selectedDeveloper)
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
                              <td>Title</td>
                              <td>Action</td>
                          </tr>
                      </thead>
                      <tbody>
                      
                          {developersData.map(developer => (
                              <tr key={developer.developerId}>
                                  <td>{developer.developerId}</td>
                                  <td>
                                      <a href={developer.developerId}>{developer.name}</a>
                                      <br />
                                      <span>Страна: {developer.country}</span></td>
                                  <td>
                                      <div onClick={() => {
                                           handleShow();
                                           editRow(developer);
                                      }}>edit</div></td>
                                  <td>
                                      <div onClick={() => {
                                           confirmRemoveRow(developer);
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

export default Developers