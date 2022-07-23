import axios from 'axios';
import React, {Component, useEffect, useState} from 'react'
import { Form, FormGroup, Label, Input, Button } from 'react-bootstrap'

const AddDeveloper = (props) => {

    const mainUrl = 'https://localhost:7245/api/Developers/';
    
    const [devname, setDevName ] = useState('');
    const [developerId, setDevCode ] = useState('');
    const [devcountry, setDevCountry ] = useState('');
    const [devId, setDevId] = useState(null);
    const [operationResult, setOperationResult] = useState(null);
    const [mode, setMode] = useState('new'); // mode. value == 'new' - new form, value == 'edit' - edit existing record

    if(props.developer) {

        const host = mainUrl + props.developer.developerId;
        console.log('props true', props);
        useEffect(() => {
            let mounted = true;
            const fetchData = async () => {
                const result = await axios(host);
                if (mounted) {
                    const res = result.data;
                    setDevName(result.data.name);
                    setDevCode(result.data.developerId);
                    setDevCountry(result.data.country);
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
        const developer = {
            name : devname,
            developerId : developerId,
            country: devcountry
        }
        console.log(developer);

        if(mode == 'new') {
            axios.post('https://localhost:7245/api/Developers', developer)
                .then(setOperationResult('its ok'))
            .catch( (err) => console.log('Error on adding' , err));
        }
        else {
            const url = mainUrl + developer.developerId;
            axios.put(url, developer)
                .then(setOperationResult('Developer is updated'))
            .catch( (err) => console.log('Error on updating' , err));
        }
    }

    const devNameChanged = (event) => {
        setDevName(event.target.value);
    }
    const devCodeChanged = (event) => {
        setDevCode(event.target.value);
    }
    const devCountryChanged = (event) => {
        setDevCountry(event.target.value);
    }
  return (
      <>
          <div>AddDeveloper</div>
          <Form onSubmit={submitData}>
              <FormGroup>

              <Form.Label>Developer code</Form.Label>
                <Form.Control id="developerId" readOnly  placeholder="Enter developer code" onChange={devCodeChanged} value={developerId}/>
                <Form.Text>Без пробелов, латиница и цифры</Form.Text>
                <br />

                <Form.Label>Developer Name</Form.Label>
                <Form.Control id="devName" placeholder="Enter developer name" onChange={devNameChanged} value={devname} />

                <Form.Label>Country</Form.Label>
                <Form.Control id="devCountry" placeholder="Enter country name" onChange={devCountryChanged} value={devcountry} />
                <Form.Text>Без пробелов, латиница и цифры</Form.Text>

              </FormGroup>
              <div>{operationResult}</div>
              <Button type="Submit">Добавить</Button>
          </Form>
      </>
  )
}


export default AddDeveloper;