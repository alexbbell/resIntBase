import React, {Component, useState, useTransition, Suspense, useEffect } from "react";

import { fetchDevelopers, fetchVitamins}  from './fakeApi'
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

//import { sendRequest } from './litedbApi';
const host =   'https://localhost:7245/api/Premix/';

const MyForm = () => {
    const initialResource = {
        firstName: 'Aleksei',
        lastName:  'Beliaev'
        // ,
     }


    const { register, handleSubmit, formState: { errors } } = useForm();
    const [premixData, setPremixData] = useState({});

    
    const handleRegistration = (data) => console.log(data);

    useEffect( () =>{
        const req  = host  + '1';
        axios.get(req).then(response => {
            setPremixData(response.data)
        }).catch(err => {
            console.log('error: ', err);
        })

    }, [] )

//    setPremixData(getPremixById(1));

    const registerOptions = {
        name: {required : "Name is required" },
        kind: {required: 'Выберите вид'}
    }

  
    function AddText() {
        setCount (prevValue => {
                return { title: prevValue.title + "Text"}
            })
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
                <div className="col-lg-3 offset-3">
                {/* <div>{premixData.title}</div> */}
                {/* <button onClick={SaveEmployee()}>++</button> */}
                <button>++</button>
                </div>
            </div>
                {/* more input fields... */}
                
        </form>
    );
  };
export default MyForm