import React, {Component, useState, useTransition, Suspense, useEffect } from "react";

import { fetchDevelopers, fetchVitamins, fetchKinds, fetchAges}  from '../fakeApi'
import { useForm } from "react-hook-form";
import axios from "axios";
import Select from 'react-select'

//import { sendRequest } from './litedbApi';
const host =   'https://localhost:7245/api/Premix/';

const PreForm = (props) => {


    const defaultPremix = (props.premix) ? props.premix : {}
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [premixSourceData, setPremixData] = useState( defaultPremix);
    const vitamins = fetchVitamins(); //get vitamins data 
    const kinds = fetchKinds(); // получение возможных видов
    const ages = fetchAges(); //возрастные категории
    const developers = fetchDevelopers();
    const [checkboxes, setCheckboxes] = useState([...new Array(vitamins.length)].map(() => false) );

    const formValues = {
        'title' : premixSourceData.title,
        'vid' : premixSourceData.vid
    }
    const [premixFormData, setPremixFormData] = useState( null);




    //Getting info about selected premix 
    useEffect(() => {
        if (typeof (premixSourceData.id) === 'undefined') {
            premixSourceData.id = 19;
        }
        else {
            premixSourceData.id = 19;
        }
        const req = host + premixSourceData.id;
        let mounted = true;
        const loadData = async () => {
            const result = await axios.get(req);
            if (mounted) {
                var js = result.data;
                setPremixData(js);
                setPremixFormData({ 'title': js.title, 'vid': js.vid, 'tu' : js.tu, 'checks': fillVitamins(js.vitamins) });
             //   checkboxesRenderCtrl(fillVitamins(js.vitamins))
            }
        };
        loadData();

        return () => {
            mounted = false;
        }
    }, []);

    const fillVitamins = (vits) => {
        let vitaminsInProduct = [];
        vitamins.map( (element, index) => {
            const isChecked  = (vits.find(x=>x.id == element.id) ) ? true : false; 
            const newVit = {
                'id': element.id,
                'title': element.title,
                'isChecked': isChecked
            }
            vitaminsInProduct.push(newVit);
        });
        return vitaminsInProduct;
    }

    
    const toggleChecked = (el, index) => {

        //checkboxData[index] = !checkboxData[index];
        console.log('el:', el.id)
        premixFormData.checks.filter(x=>x.id === el.id).forEach(element => {
            element.isChecked = !element.isChecked;
        });
        setPremixFormData(premixFormData)
        console.log(premixFormData.checks);
    } 

    const checkboxesRenderCtrl = (vits) => {
        const result = vitamins.map((element, index) => {
            //const isChecked  = (premixSourceData.vitamins.find(x=>x.id == element.id) ) ? true : false; 
        let isResult  = vits.filter(x=>x.id === element.id && x.isChecked === true);
        let isChecked = (isResult.length > 0) ? true : false;
        //  ? true : false; 


            return (
                <div className="checkboxfloat" key={index}>
                    {/* <span>{checks[0].id}</span> */}
                    <input type="checkbox"
                        name="vitamins" {...register('vitamins')}
                         defaultChecked={isChecked}
                        onChange={() => toggleChecked(element, index)}
                        value={element.id}
                    ></input><br /> 
                    {element.title}

                </div>
            )
        });
        return result;
    }



    const handleRegistration = (data) =>  {
        console.log('data: ', JSON.stringify(data));
        axios.post(host, data)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        });
    }
    //const checkboxesCtrl = checkboxesRenderCtrl(premixFormData);
    console.log('premixFormData', premixFormData);
    const registerOptions = {
        name: {required : "Name is required" },
        kind: {required: 'Выберите вид'},
        tu: {},
        checkboxes : {required: 'Выбрать'}

    }
    if(!premixFormData) {
        return (
            <div>Loading</div>
        )
    }
    else  {
    return (
        <form onSubmit={handleSubmit(handleRegistration)}>
  
            <div className="row">
                <div className="col-lg-1 offset-3">
                    <label htmlFor="name">Name</label>
                </div>
                <div className="col-lg-3">
                    <input type="text" name="name" {...register('name', registerOptions.name)}
                        value={premixFormData.title || ''}
                        onChange={(e) => setPremixFormData({
                            ...premixFormData,
                            title: e.target.value
                        })}
                    />
                    <label>{errors?.name && errors.name.message}</label>
                    <label></label>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-1 offset-3">
                    <label htmlFor="kind">ТУ</label>
                    </div>
                <div className="col-lg-3">
                    <input type="text" name="tu" {...register('tu', registerOptions.tu)} 
                       value={premixFormData.tu || ''}
                        onChange={ (e) => setPremixFormData( {
                            ...premixFormData,
                            tu: e.target.value
                        } )}
                    
                    />
                    <label>{errors?.kind && errors.kind.message}</label>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-1 offset-3">
                    <label htmlFor="kind">Вид</label>
                    </div>
                <div className="col-lg-3">
                    <select name="vid" {...register('kind', registerOptions.kind)}  defaultValue={premixFormData.vid} 
                    onChange={
                        (e) => setPremixFormData( {
                            ...premixFormData,
                            kind: e.target.value
                        })
                    }>
                    <option >Выберите значение</option>
                    {                        
                        kinds.map(el => (
                            <option key={el.value} value={el.value}>{el.label}</option>
                    ))}
                    </select>
                    <label>{errors?.kind && errors.kind.message}</label>
                </div>
            </div>


            <div className="row">
                <div className="col-lg-1 offset-3">
                    <label htmlFor="kind">Возрастная категория</label>
                    </div>
                <div className="col-lg-3">
                    <select name="age" {...register('age', registerOptions.kind)}  defaultValue={premixFormData.age} 
                    onChange={
                        (e) => setPremixFormData( {
                            ...premixFormData,
                            age: e.target.value
                        })
                    }>
                    <option >Выберите значение</option>
                    {                        
                        ages.map(el => (
                            <option key={el.value} value={el.value}>{el.label}</option>
                    ))}
                    </select>
                    <label>{errors?.kind && errors.kind.message}</label>
                </div>
            </div>


            <div className="row">
                <div className="col-lg-1 offset-3">
                    <label htmlFor="kind">Производитель</label>
                    </div>
                <div className="col-lg-3">
                    <select name="developer" {...register('developer', registerOptions.kind)}  defaultValue={premixFormData.developer} 
                    onChange={
                        (e) => setPremixFormData( {
                            ...premixFormData,
                            developer: e.target.value
                            //developer: e.target.selectedOptions
                        })
                    }>
                    <option >Выберите значение</option>
                    {                        
                        developers.map(el => (
                            <option key={el.value} value={el.value}>{el.label}</option>
                    ))}
                    </select>
                    <label>{errors?.kind && errors.kind.message}</label>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-1 offset-3">
                    <label htmlFor="kind">Состав</label>
                    </div>
                <div className="col-lg-3 ">
                     {checkboxesRenderCtrl(premixFormData.checks)} 
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
}
export default PreForm;