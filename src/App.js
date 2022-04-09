import React, {Component, useState, useTransition, Suspense } from "react";
// //import {Form, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import  Container  from "react-bootstrap/Container";
import  Row  from "react-bootstrap/Row";
import  Col  from "react-bootstrap/Col";
import { fetchDevelopers, fetchVitamins}  from './fakeApi'


function App( {name, callback}) {
   let add = (x, y) => x + y;
   var att = [1, 2,4,5, 6]
   console.log(...att)

   const initialResource = {
      firstName: 'Aleksei',
      lastNmae:  'Beliaev'
   }
   const[resource, setResource] = useState(initialResource);
   const[isPending, startTransition] = useTransition();
   const[firstName, setName] = useState('Alek');
   
   return (
      <div ref={callback}>



{/* title: 'FI-2', vid: 'Комплекс с инулином', sostav: 'A, D3, B6, инулин', age : 'ДРВ', developer: 'Terezia', buyer: '', dstill: '2021' */}
<Container>
<Row>
    <Col></Col>
    <Col lg={10} >
<Form>
<h1>Hello {name}! !</h1>

  <Form.Group className="mb-3" controlId="formTitle">
    <Form.Label>Название</Form.Label>
    <Form.Control type="text" placeholder="Enter title" />
    <Form.Text className="text-muted"></Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formKind">
    <Form.Label>Вид</Form.Label>
    <Form.Control type="text" placeholder="Укажите вид" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formSostav">
     <Form.Label>Состав</Form.Label>:&nbsp;
     <CtrlVitamins />

{/* 
      <Form.Check inline type="checkbox" label="A" />
      <Form.Check inline type="checkbox" label="B3" />
      <Form.Check inline type="checkbox" label="Инулин" />
      <Form.Check inline type="checkbox" label="Кальций" />
      <Form.Check inline type="checkbox" label="Йод" /> */}
  </Form.Group>

  <CtrlDevelopers />

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</Col>

</Row>
</Container>


         <button 
            onClick={ () => {
                console.log('test');

            }}
         >Next</button>
         <div>{firstName}</div>
         <Content resource={resource} />
      </div>
   )
 }


function CtrlDevelopers() {
   const devs = fetchDevelopers();
   const options = devs.map(opt => {
      return (
         <option key={opt.devtitle} value={opt.devtitle}>{opt.devtitle}</option>
      )
   });
   return (
      <Form.Group className="mb-3" controlId="formSostav">
         <Form.Label>Разработчик</Form.Label>:&nbsp;
         <Form.Select>
            <option>Open this to select item</option>
            {options}
         </Form.Select>
      </Form.Group>
   )
}

function CtrlVitamins() {
   const vits = fetchVitamins();
   console.log(vits);
   const vitsCtrl = vits.map((opts) => {
      return (
         <Form.Check inline type="checkbox" label={opts.title} key={opts.title} />
      )
   });
   return (
      <div>
      {vitsCtrl}
      </div>
   )
}

 function Content ( {resource}) {
    console.log('res: ',resource);
    const dat = resource.firstName;
    return (
       <div>{dat}</div>
    )
 }
export default App;