import React, {Component, useState, useTransition, Suspense, useEffect } from "react";

import { fetchDevelopers, fetchVitamins, fetchKinds, fetchAges}  from '../fakeApi'
import { useForm } from "react-hook-form";
import axios from "axios";
import { Form,  FormGroup, Label, Input, Button } from 'react-bootstrap'


//import { sendRequest } from './litedbApi';
const host =   'https://localhost:7245/api/Premixes/';

const Preform = (props) => {

    //const defaultPremix = (props.premix) ? props.premix : {}
    const [premixSourceData, setPremixData] = useState( []);
    const vitamins = fetchVitamins(); //get vitamins data 
    const kinds = fetchKinds(); // получение возможных видов
    const ages = fetchAges(); //возрастные категории
    const developers = fetchDevelopers();
    const [checkboxes, setCheckboxes] = useState([...new Array(vitamins.length)].map(() => false) );

    const [premixFormData, setPremixFormData] = useState( {});
    const [vitaminsSelected, setVitaminData] = useState( []);
    const [mode, setMode] = useState('new'); // mode. value == 'new' - new form, value == 'edit' - edit existing record

    const { register, handleSubmit, reset } = useForm();

  //  const { reset, register } = useForm();


if(props.premix) {

    let req = host + props.premix.id;

    //Getting info about selected premix 
    useEffect(() => {
console.log('props: ', props);
 
        setMode('edit');
        let mounted = true;
        const loadData = async () => {
            if(props.premix.id !== undefined) {
                const result = await axios.get(req);
                if (mounted) {
                    const js = result.data;
                    console.log('js', js);
                    setPremixFormData(
                        {
                            'premixId' : js.premixId,
                            'title': js.title, 
                            'vid': js.vid, 
                            'tu': js.tu, 
                            'vitamins': fillVitamins(js.vitamins), 
                            'age': js.age,
                            'developer' : js.developerName,
                            'developerId' : js.developerId
                        }
                    );
                }
        }

        };
        loadData();
        return () => {
            mounted = false;
        }
    }, [mode]);
}
//Clean form
// else {
//     console.log('//Clean form');

//     useEffect(() => {
//         let mounted = true;

//         if(mounted) {

//             var defVits = [
//                 {
//                     "vitaminId": 1,
//                     "vitaminTitle": "A"
//                 },
//                 {
//                     "vitaminId": 3,
//                     "vitaminTitle": "C"
//                 }
//             ];
//             setPremixFormData(
//                 {
//                     'title': 'Тест премикс',
//                     'vid': 'vitamin',
//                     'tu': 'Тут какая-то строка ТУ',
//                     'vitamins': fillVitamins(defVits),
//                     'age': 'dish',
//                     'developer': 'Terezia',
//                     'developerId': 2
//                 }

//             );
//         }
//         return () => {
//             mounted = false;
//         }
//     }, []);
// }


    // useEffect(() => {
    //     //fillVitamins(vitaminsSelected)
    // }, []);

    const fillVitamins = (vits) => {
        console.log('vits', vits);
        let vitaminsInProduct = [];
        vitamins.map( (element) => {
            const isChecked  = (vits.find(x=>x.vitaminTitle == element.vitaminTitle) ) ? true : false; 
            const newVit = {
                'vitaminId': element.vitaminId,
                'vitaminTitle': element.vitaminTitle,
                'isChecked': isChecked
            }
            vitaminsInProduct.push(newVit);
        });

        //setVitaminData(vitaminsInProduct);
        return vitaminsInProduct;
    }

    
    const toggleChecked = (el, index) => {
        premixFormData.vitamins.filter(x=>x.vitaminId === el.vitaminId).forEach(element => {
            element.isChecked = !element.isChecked;
        });
        setVitaminData(el=> {
            return {
                ...premixFormData
            }
        });
    } 


    const RenderVitaminBlock = () => {
        let str = vitaminsSelected.map((element, index) => {
            //let isChecked = element.isChecked;
            return (
                <div key={index} className="checkboxfloat">
                    
                    <Form.Check type="checkbox" 
                        id="vitamins[index]}" 
                        defaultValue={element.id} label={element.title} 
                         checked={element.isChecked}
                         
                         onChange={() => toggleChecked(element, index)} 
                       ></Form.Check>
                        
                    <br />
                    
                    </div>
            )
        });
        
        return str;

    }




    const submitData = (data) =>  {
        
        data.preventDefault();
        

        var vits = [];
        premixFormData.vitamins.forEach(el => {
            if(el.isChecked == true) {
                vits.push({
                    "vitaminId": el.vitaminId
                 })
            }
        })

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
        if(premixFormData.premixId) {
            axios.put(host + premixFormData.premixId  + '?premixId='+ premixFormData.premixId, data2Submit)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            });
            
        }
        else {
            axios.post(host, data2Submit)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            });
        }
    }


    if(!premixFormData) {
        return (
            <div>Loading</div>
        )
    }
    else  {
    return (
        <Form onSubmit={submitData}>

            <div className="row">
                <h1>{mode}</h1>
            </div>
            <div className="row">

                <div className="col-lg-5  offset-1">
                    
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

                <div className="col-lg-5 offset-1">
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

                <div className="col-lg-5 offset-1">

                <Form.Label>Vid</Form.Label>
                <Form.Select id="vid"  aria-label="Choose vid" 
                 onChange={(e) => setPremixFormData({
                            ...premixFormData,
                            vid: e.target.value
                        })} 
                         value={premixFormData.vid}

                        >
                    {                        
                        kinds.map(el => (                            
                            <option key={el.value} value={el.value}>{el.label}</option>
                    ))}
                </Form.Select>
                <Form.Text>Без пробелов, латиница и цифры</Form.Text>
                    

                </div>
            </div>




            <div className="row">

                <div className="col-lg-5 offset-1">


                <Form.Label>Age</Form.Label>
                <Form.Select id="age"  aria-label="Choose age"  
                onChange={(e) => setPremixFormData({
                            ...premixFormData,
                            age: e.target.value
                        })} 
                        value={premixFormData.age}>
                    {                        
                        ages.map(el => (
                            <option key={el.value} value={el.value}>{el.label}</option>
                    ))}
                </Form.Select>

                </div>
            </div>


            <div className="row">

                <div className="col-lg-5 offset-1">


                <Form.Label>developer</Form.Label>
                <Form.Select id="developer"  aria-label="Choose developer" 
                 onChange={(e) => setPremixFormData({
                            ...premixFormData,
                            developer: e.target.value,
                            developerId: e.target.developerId,
                            developerName: e.target.developerName

                        })} 
                        defaultValue={premixFormData.developerId}>
                    {                        
                        developers.map(el => (
                            <option key={el.id} value={el.id}>{el.value}</option>
                    ))}
                </Form.Select>


      
                </div>
            </div>

            <div className="row">

                <div className="col-lg-5 offset-1 ">
                     {/* <RenderVitaminBlock vits={props.vitaminsSelected}></RenderVitaminBlock> */}
                     <label htmlFor="kind">Состав</label>
                                <div>
           {          vitamins.map((element, index) => {
            //let isChecked = element.isChecked;
            
            let isChecked = false;
            if(premixFormData.vitamins) {
                 isChecked  = (premixFormData.vitamins.find(x=>x.vitaminTitle === element.vitaminTitle && x.isChecked == true) ) ? true : false; 
            }
            

            return (
                <div key={index} className="checkboxfloat">
                    
                    <Form.Check type="checkbox" className="vita"
                        id="vitamins[index]}" 
                        defaultValue={element.vitaminId} label={element.vitaminTitle} 
                         checked={isChecked}
                         
                         onChange={() => toggleChecked(element, index)} 
                       ></Form.Check>
                        
                    <br />
                    
                    </div>
            )
        })
}
</div>
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