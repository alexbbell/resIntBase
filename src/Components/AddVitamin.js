import axios from 'axios';
import React, {Component, useEffect, useState} from 'react'
import { Form, FormGroup, Label, Input, Button } from 'react-bootstrap'

const AddVitamin = (props) => {
    const mainUrl = 'https://localhost:7245/api/Vitamins/';
    
    const [vitaminTitle, setVitaminTitle ] = useState(null);
    const [vitaminId, setVitaminId ] = useState(null);
    const [vitRastvor, setVitRastvor ] = useState(null);
    const [operationResult, setOperationResult] = useState(null);
    const [mode, setMode] = useState('new'); // mode. value == 'new' - new form, value == 'edit' - edit existing record



    useEffect(() => {
        console.log('effect rinnung');
        let mounted = true;
        const fetchData = async () => {
            if (typeof props.vitamin.vitaminId !== undefined) {
                const host = mainUrl + props.vitamin.vitaminId;
                const result = await axios(host);
                if (mounted) {
                    setVitaminTitle(result.data.title);
                    setVitaminId(result.data.vitaminId);
                    setVitRastvor(result.data.rastvor);
                    setMode('edit');
                }
            }
            else {
                setMode('new');
            }
        };
        fetchData();
        return () => {
            mounted = false;
        }
    }, []);
    



    const submitData = (event) => {
        event.preventDefault();
        let  vitamin = {};
        if (vitaminId === null) {
            vitamin = {
                vitaminTitle: vitaminTitle,
                rastvor: vitRastvor
            }
        }
        else {
            vitamin = {
                vitaminTitle: vitaminTitle,
                vitaminId: vitaminId,
                rastvor: vitRastvor
            }
        }

        console.log(vitamin);

        if(mode == 'new') {
            axios.post('https://localhost:7245/api/Vitamins', vitamin)
                .then(setOperationResult('its ok'))
            .catch( (err) => console.log('Error on adding' , err));
        }
        else {
            const url = mainUrl + vitamin.vitaminId;
            axios.put(url, vitamin)
                .then(setOperationResult('Vitamin is updated'))
                .catch( (err) => console.log('Error on updating' , err));
        }
    }

    const vitTitleChanged = (event) => {
        setVitaminTitle(event.target.value);
    }
    const vitRastvorChanged = (event) => {
        setVitRastvor(event.target.value);
    }
  return (
      <>
          <h1>Add Vitamin</h1>
          <Form onSubmit={submitData}>
              <FormGroup>

              <Form.Label>Vitamin ID</Form.Label>: <Form.Label>{vitaminId}</Form.Label> <br />
              <Form.Label>Vitamin Title</Form.Label>
              <Form.Control id="vitaminTitle" placeholder="Enter vitamin Title" onChange={vitTitleChanged} defaultValue={vitaminTitle} />

                <Form.Label>Type</Form.Label>
                <Form.Control id="vitRastvor" placeholder="Enter rastvor name" onChange={vitRastvorChanged} defaultValue={vitRastvor} />
                <Form.Text>раствор или минеральный</Form.Text>

              </FormGroup>
              <div>{operationResult}</div>
              <Button type="Submit">Добавить</Button>
          </Form>
      </>
  )
}


export default AddVitamin;