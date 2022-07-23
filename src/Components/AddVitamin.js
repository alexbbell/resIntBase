import axios from 'axios';
import React, {Component, useEffect, useState} from 'react'
import { Form, FormGroup, Label, Input, Button } from 'react-bootstrap'

const AddVitamin = (props) => {
console.log(props);
    const mainUrl = 'https://localhost:7245/api/Vitamins/';
    
    const [vitaminTitle, setVitaminTitle ] = useState('');
    const [vitaminid, setVitaminId ] = useState(0);
    const [vitRastvor, setVitRastvor ] = useState('');
    const [operationResult, setOperationResult] = useState(null);
    const [mode, setMode] = useState('new'); // mode. value == 'new' - new form, value == 'edit' - edit existing record

    if(props.vitamin) {

        const host = mainUrl + props.vitamin.vitaminid;
        console.log('props true', props);
        useEffect(() => {
            let mounted = true;
            const fetchData = async () => {
                const result = await axios(host);
                if (mounted) {
                    setVitaminTitle(result.data.title);
                    setVitaminId(result.data.vitaminid);
                    setVitRastvor(result.data.rastvor);
                    setMode('edit');
                }
            }
            fetchData();
            return () => {
                mounted = false;
            }
        }, [mode]);
    }
    else {
        console.log('props falase', props);
    }
    



    const submitData = (event) => {
        event.preventDefault();
        const vitamin = {
            title : vitaminTitle,
            vitaminid : vitaminid,
            rastvor: vitRastvor
        }
        console.log(vitamin);

        if(mode == 'new') {
            axios.post('https://localhost:7245/api/Vitamins', vitamin)
                .then(setOperationResult('its ok'))
            .catch( (err) => console.log('Error on adding' , err));
        }
        else {
            const url = mainUrl + vitamin.vitaminid;
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

              <Form.Label>Vitamin ID</Form.Label>: <Form.Label>{vitaminid}</Form.Label> <br />
              <Form.Label>Vitamin Title</Form.Label>
              <Form.Control id="vitaminTitle" placeholder="Enter vitamin Title" onChange={vitTitleChanged} value={vitaminTitle} />

                <Form.Label>Type</Form.Label>
                <Form.Control id="vitRastvor" placeholder="Enter rastvor name" onChange={vitRastvorChanged} value={vitRastvor} />
                <Form.Text>раствор или минеральный</Form.Text>

              </FormGroup>
              <div>{operationResult}</div>
              <Button type="Submit">Добавить</Button>
          </Form>
      </>
  )
}


export default AddVitamin;