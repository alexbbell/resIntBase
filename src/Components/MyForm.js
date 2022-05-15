import React, {Component, useState, useTransition, Suspense, useEffect } from "react";

import { fetchDevelopers, fetchVitamins}  from '../fakeApi'
import { useForm } from "react-hook-form";
import axios from "axios";

//import { sendRequest } from './litedbApi';
const host =   'https://localhost:7245/api/Premix/';

const MyForm = (props) => {


    const defaultPremix = (props.premix) ? props.premix : {}
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [premixData, setPremixData] = useState( defaultPremix);    
    const vitamins = fetchVitamins();
    const [checkboxes, setCheckboxes] = useState([...new Array(vitamins.length)].map(() => false) );


    //Getting info about selected premix 
    useEffect( () =>{
        if(typeof(premixData.id) === 'undefined') {
            premixData.id = 0;
        }
        const req  = host  + premixData.id;
        axios.get(req).then(response => {
        console.log('32line: ', response.data);
        var js = response.data;
  

            // if(js.vitamins) {
            //     checkVitaminsonLoad(response.data.vitamins);
            // }
            setPremixData(js);        

        }).catch(err => {
            console.log('error: ', err);
        })
    }, [] )




    const toggleChecked = (el, index) => {
            const checkboxData = [...checkboxes]
            console.log(checkboxData[index]);
       
            //el.target.checked = !isChecked;
            checkboxData[index] = !checkboxData[index];
            
            setCheckboxes(checkboxData)
            premixData.vitamins = checkboxData;
            setPremixData(premixData);
//            console.log('checkboxData', checkboxData);
    }
     const checkboxesCtrl = 
        vitamins.map( (element, index) => {
        const isChecked  = (premixData.vitamins.find(x=>x.id == element.id) ) ? true : false; 

            return <div className="checkboxfloat" key={index}> 
                <input type="checkbox" 
                name="vitamins" {...register('vitamins')} 
                checked={isChecked}
                onChange= { () => toggleChecked(element, index)}
                value={element.id}
                ></input><br />
                {element.title} 
                
                </div>
                }
        );


    
    const registerOptions = {
        name: {required : "Name is required" },
        kind: {required: 'Выберите вид'},
        checkboxes : {required: 'Выбрать'}

    }
    const handleRegistration = (data) => console.log(data);


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
                    
                    <label>{errors?.kind && errors.kind.message}</label>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-3 offset-3">

                <button onClick={handleSubmit(handleRegistration)} className="btn btn-primary">Save</button>
                </div>
            </div>
                {/* more input fields... */}
                
        </form>
    );
  };
export default MyForm