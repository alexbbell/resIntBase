import React, {Component, useState, useTransition, Suspense, useEffect } from "react";
import {  fetchKinds, fetchAges, mainUrl}  from '../fakeApi'
import axios from "axios";
import { Form,  FormGroup, Label, Input, Button } from 'react-bootstrap'
import VitaminCtrl from './VitaminsCtrl.js';

import { ErrorTag } from '../Helpers/Helpers.js';

const host =   mainUrl + '/api/Premixes/';

const Preform = (props) => {


    const kinds = fetchKinds(); // получение возможных видов
    const ages = fetchAges(); //возрастные категории
    //const developers = fetchDevelopers();
    //const [checkboxes, setCheckboxes] = useState([...new Array(vitamins.length)].map(() => false) );

    const [premixFormData, setPremixFormData] = useState( {});
    const [mode, setMode] = useState('new'); // mode. value == 'new' - new form, value == 'edit' - edit existing record
    const [vitaminsSelected, setVitaminData] = useState([]);
    
    const [developers, setDevelopers] = useState([]);
    const [errorFillVid, setErrorFillVid] = useState()
    const [errorFillAge, setErrorFillAge] = useState()
    const [successResult, setSuccessResult] = useState();
    const [errorResult, setErrorResult] = useState();

    //Getting info about selected premix 
    useEffect(() => {
        console.log('props: ', props);

        if (props.premix) {

            let req = host + props.premix.id;

            let mounted = true;
            const loadData = async () => {
                if (props.premix.id !== undefined) {
                    const result = await axios.get(req);
                    if (mounted) {
                        const js = result.data;
                        console.log('js', js);
                        setMode('edit');

                        setPremixFormData(
                            {
                                'premixId': js.premixId,
                                'title': js.title,
                                'vid': js.vid,
                                'tu': js.tu,
                                'vitamins': js.vitamins,
                                'age': js.age,
                                'developer': js.developerName,
                                'developerId': js.developerId
                            }
                        );
                    }
                }

            };
            loadData();
            return () => {
                mounted = false;
            }
        }
        }, [mode]);

//Loading developers
    useEffect( () => {
        let mounted = true;
        const fetchData = async () => {
          const result = await axios( mainUrl + '/api/Developers');
          console.log('95', result)

          if (mounted) {
            setDevelopers(result.data);
          }
        }
        fetchData();
        return () => {
            mounted = false;
        }
    }, []);


    const  changeVit = () => {
        //console.log('changeVit');
        //console.log('vitaminsSelectedPrem169', vitaminsSelected);
    }



    const formCheck = () => {
        let err = 0;
        setErrorFillVid(null);
        setErrorFillAge(null);
        //Check the form
        if (typeof premixFormData.vid === 'undefined') {
            err++;
            setErrorFillVid('Не заполнено поле Вид');
        }

        if (typeof premixFormData.age === 'undefined') {
            err++;
            setErrorFillAge('Не заполнено поле Age');
        }

        return err;
    }

    const submitData = (data) =>  {
        
        data.preventDefault();

        var vits = [];
        vitaminsSelected.forEach(el => {
            if(el.isChecked == true) {
                vits.push({
                    "vitaminId": el.vitaminId
                 })
            }
        })

        let err = formCheck();
  
        //setErrorFillForm

        if (err == 0) {

            var data2Submit = {
                'premixId':  (premixFormData.premixId)  ? premixFormData.premixId : 0,
                'vid' : premixFormData.vid,
                'age' : premixFormData.age,
                'tu' : premixFormData.tu,
                'developerId' : premixFormData.developerId,
                'developerName' : '',
                'vitamins' : vits,
                'title': premixFormData.title
           }
            console.log('data2Submit', data2Submit)
            if (premixFormData.premixId) {
                axios.put(host + premixFormData.premixId + '?premixId=' + premixFormData.premixId, data2Submit)
                    .then(response => {
                        console.log(response);
                        setSuccessResult("Updated successfully");
                    })
                    .catch(error => {
                        console.log(error.response);
                        setErrorResult(error.response);
                    });

            }
            else {
                axios.post(host, data2Submit)
                    .then(response => {
                        console.log(response);
                        setSuccessResult("Added successfully");


                    })
                    .catch(error => {
                        console.log(error.response);
                        setErrorResult(error.response);
                    });
            }
        }
        else {
            console.log('Illegall form fill')
        }
    }


    if(!premixFormData) {
        return (
            <div></div>
        )
    }
    else  {
    return (
        <Form onSubmit={submitData}>

            <div className="row">
                <h1>{mode}</h1>
            </div>
            <div className="row">

                <div className="col-12  offset-1">
                    
                <Form.Label>Premix title</Form.Label>
                <Form.Control id="title"  placeholder="Enter title here"  
                onChange={(e) => setPremixFormData({
                            ...premixFormData,
                            title: e.target.value
                        })} 
                        defaultValue={premixFormData.title}/>
                <Form.Text>Без пробелов, латиница и цифры</Form.Text>

              
                
                </div>
            </div>





            <div className="row">

                <div className="col-lg-10 offset-1">
                <Form.Label>TU</Form.Label>
                <Form.Control id="tu"  placeholder="Enter tu"  
                onChange={(e) => setPremixFormData({
                            ...premixFormData,
                            tu: e.target.value
                        })} 
                        defaultValue={premixFormData.tu}/>
                <Form.Text>Без пробелов, латиница и цифры</Form.Text>
                    
                </div>
            </div>

            <div className="row">

                <div className="col-lg-10 offset-1">

                <Form.Label>Vid</Form.Label>
                    <Form.Select id="vid" aria-label="Choose vid"
                        onChange={(e) => {
                            if (e.target.value != 'none') {
                                setPremixFormData({
                                    ...premixFormData,
                                    vid: e.target.value
                                }
                                );
                            }
                        }
                        }
                        value={premixFormData.vid}  >
                             <option key='none' value='none'>Choose value</option>
                    {                        
                        kinds.map(el => (                            
                            <option key={el.value} value={el.value}>{el.label}</option>
                    ))}
                </Form.Select>
                <Form.Text>Без пробелов, латиница и цифры</Form.Text>
                <ErrorTag msg={ errorFillVid}></ErrorTag>

                </div>
            </div>


            <div className="row">

<div className="col-lg-5 offset-1">
    { ((premixFormData.vitamins && mode == 'edit') ) ? <VitaminCtrl vits={premixFormData.vitamins}  setArrFunc={setVitaminData} onChange={ changeVit()}  /> : <div>...Loading</div>  }
    { mode == 'new'  ?  <VitaminCtrl vits={[]} setArrFunc={setVitaminData} onChange={ changeVit()}  /> : ''  }
    
</div>

</div>

            <div className="row">

                <div className="col-lg-10 offset-1">
                <Form.Label>Age</Form.Label>
                <Form.Select id="age"  aria-label="Choose age"  
                onChange={(e) => 
                    {
                        if (e.target.value != 'none') {
                        setPremixFormData({
                            ...premixFormData,
                            age: e.target.value
                        })}
                        }
                    } 
                        value={premixFormData.age}>
                        <option key='none' value='none'>Choose Age</option>
                    {                        
                        ages.map(el => (
                            <option key={el.value} value={el.value}>{el.label}</option>
                    ))}
                </Form.Select>
                <ErrorTag msg={ errorFillVid}></ErrorTag>

                </div>
            </div>


            <div className="row">

                <div className="col-lg-10 offset-1">


                <Form.Label>developer</Form.Label>
                <Form.Select id="developer"  aria-label="Choose developer" 
                defaultValue={premixFormData.developerId} value={premixFormData.developerId}
                 onChange={(e) => setPremixFormData({
                            ...premixFormData,
                            developerId: e.target.value,
                        })} >
                            <option key={'empty_dev'} value='' >Выберите поставщика</option>
                    {                        
                        developers.map(el => (
                            <option key={el.developerId} value={el.developerId}>{el.name}</option>
                    ))}
                </Form.Select>

                        <div>
                        {premixFormData.developerId}</div>
      
                </div>
            </div>


            <div className="row">
                <div className="col-lg-10">
                    {successResult}
                    <br />
                    {errorResult}
                </div>
            </div>

            <div className="row">
                <div className="col-lg-3 offset-3">
                <button className="btn btn-primary">Save</button>
                </div>
            </div>
                {/* more input fields... */}
                
        </Form>
    );
  };
}
export default Preform;