import React, {Component, useState, useTransition, Suspense, useEffect } from "react";

import { fetchDevelopers, fetchVitamins, fetchKinds, fetchAges}  from '../fakeApi'
import { useForm } from "react-hook-form";
import axios from "axios";

//import { sendRequest } from './litedbApi';
const host =   'https://localhost:7245/api/Premixes/';

const Preform = (props) => {


    //const defaultPremix = (props.premix) ? props.premix : {}
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [premixSourceData, setPremixData] = useState( []);
    const vitamins = fetchVitamins(); //get vitamins data 
    const kinds = fetchKinds(); // получение возможных видов
    const ages = fetchAges(); //возрастные категории
    const developers = fetchDevelopers();
    const [checkboxes, setCheckboxes] = useState([...new Array(vitamins.length)].map(() => false) );

    const [premixFormData, setPremixFormData] = useState( {});
    const [vitaminsSelected, setVitaminData] = useState( []);
    const [mode, setMode] = useState('new'); // mode. value == 'new' - new form, value == 'edit' - edit existing record

console.log('props: ', props);

if(props.premix) {
    //Getting info about selected premix 
    useEffect(() => {
 
        const req = host + props.premix.id;
    
        let mounted = true;
        const loadData = async () => {
            const result = await axios.get(req);
            if (mounted) {
                var js = result.data;
                console.log('js', js);
                setPremixFormData({ 'title': js.title, 'vid': js.vid, 'tu' : js.tu, 'vitamins': js.vitamins });
                fillVitamins(js.vitamins);
                //checkboxesRenderCtrl(fillVitamins(js.vitamins))
                setMode('edit');
            }
        };
        loadData();

        return () => {
            mounted = false;
        }
    }, []);
}
    const fillVitamins = (vits) => {
        let vitaminsInProduct = [];
        vitamins.map( (element) => {
            const isChecked  = (vits.find(x=>x == element.title) ) ? true : false; 
            const newVit = {
                'id': element.id,
                'title': element.title,
                'isChecked': isChecked
            }
            vitaminsInProduct.push(newVit);
        });

        setVitaminData(vitaminsInProduct);
        return vitaminsInProduct;
    }

    
    const toggleChecked = (el, index) => {

        vitaminsSelected.filter(x=>x.title === el.title).forEach(element => {
            element.isChecked = !element.isChecked;
        });
        setVitaminData(vitaminsSelected);

    } 


    const RenderVitaminBlock = () => {
        console.log('vitaminsSelected', vitaminsSelected);
        return(
            <div>
            {vitaminsSelected.map((element, index) => {
                let isChecked = element.isChecked;
                return (
                    <div key={index}>
                        <input type="checkbox" 
                        name="vitamins" {...register('vitamins')} 
                        defaultChecked={element.isChecked}
                        value={element.title}
                        onChange={() => toggleChecked(element, index)}

                        /><br />{element.title} {element.isChecked}</div>
                    )
            })
        }
            </div>
        )
            
        
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
                    <label htmlFor="tu">ТУ</label>
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
                     { RenderVitaminBlock() } 

                     {/* {checkboxesRenderCtrl(premixFormData.checks)}  */}
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
export default Preform;