import React, {Component, useState, useTransition, Suspense, useEffect } from "react";

import { fetchDevelopers, fetchVitamins}  from './fakeApi'
import { useForm } from "react-hook-form";
import axios from "axios";

//import { sendRequest } from './litedbApi';
const host =   'https://localhost:7245/api/Premix/';

const MyForm = (props) => {
    const initialResource = {
        firstName: 'Aleksei',
        lastName:  'Beliaev'
        // ,
     }


    const defaultPremix = (props.premix) ? props.premix : {}
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [premixData, setPremixData] = useState( defaultPremix);    
    const handleRegistration = (data) => console.log(data);
    const [checkboxes, setCheckboxes] = useState([...new Array(4)].map(() => false) );


    //Getting info about selected premix 
    useEffect( () =>{
        if(typeof(premixData.id) === 'undefined') {
            premixData.id = 0;
        }
        const req  = host  + premixData.id;
        axios.get(req).then(response => {
console.log('32line: ', response.data);
            setPremixData(response.data);
            if(response.data.vitamins) {
                checkVitaminsonLoad(response.data.vitamins);
            }
        }).catch(err => {
            console.log('error: ', err);
        })
    }, [] )

    const vitamins = fetchVitamins();

    const checkVitaminsonLoad = (inVit) => {
        var checkedItems = []
        vitamins.forEach( (vall, index) => {
            checkedItems[index] = false
            inVit.forEach(vs => {

                if(vs.title === vall.title ) {
                    checkedItems[index] = true
                }
            }) 
        });
        
        setCheckboxes(checkedItems);
        console.log('checkedItems', checkedItems);

    } 
     //setCheckboxes(vitamins);

    const toggleChecked = (title, index) => {
            const checkboxData = [...checkboxes]
            checkboxData[index] = !checkboxData[index];
            setCheckboxes(checkboxData)
            console.log('checkboxData', checkboxData);
    }
     const checkboxesCtrl = 
        vitamins.map( (element, index) => 
            <div className="checkboxfloat" key={index}>
                <input type="checkbox" name="vitamin"
                    checked={checkboxes[index]}
                    onChange= { () => toggleChecked(element, index)}
                    value={checkboxes[index]}
                    ></input><br />
                {element.title} {checkboxes[index]}
                
                </div>
        );


    
    const registerOptions = {
        name: {required : "Name is required" },
        kind: {required: 'Выберите вид'}
    }


    return (
        <form onSubmit={handleSubmit(handleRegistration)}>
            <div className="row">
                <div className="col-lg-1 offset-3">
                    <label htmlFor="name">Name</label>
                </div>
                <div className="col-lg-3">
                    <input type="text" name="name" {...register('name', registerOptions.name)} 
                    value={premixData.title || ''}
                    onChange={ (e) => setPremixData( {
                        ...premixData,
                        title: e.target.value
                    } )}
                    />
                    <label>{errors?.name && errors.name.message}</label>
                    <label></label>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-1 offset-3">
                    <label htmlFor="kind">Вид</label>
                    </div>
                <div className="col-lg-3">
                    <input type="text" name="kind" {...register('kind', registerOptions.kind)} 
                       value={premixData.vid || ''}
                        onChange={ (e) => setPremixData( {
                            ...premixData,
                            vid: e.target.value
                        } )}
                    
                    />
                    <label>{errors?.kind && errors.kind.message}</label>
                </div>
            </div>


            <div className="row">
                <div className="col-lg-1 offset-3">
                    <label htmlFor="kind">Состав</label>
                    </div>
                <div className="col-lg-3 ">
                    {checkboxesCtrl}
                    <input type="checkbox" name="sostav" ></input>
                    
                    <label>{errors?.kind && errors.kind.message}</label>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-3 offset-3">

                <button className="btn btn-primary">Save</button>
                </div>
            </div>
                {/* more input fields... */}
                
        </form>
    );
  };
export default MyForm