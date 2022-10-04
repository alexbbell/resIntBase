import React, {Component, useState, useTransition, Suspense, useEffect } from "react";
import axios from "axios";

import { Form,  FormGroup, Label, Input, Button } from 'react-bootstrap'


const VitaminCtrl = (props) => {

    const vitaminsUrl =   'https://localhost:7245/api/Vitamins/';
    const [existingVits, loadExistingVits] = useState([]);
    const [vitamins, loadVitamins] = useState([]);
    const [vitaminFormData, setVitaminFormData] = useState([]);

    useEffect( () => {
        let mounted = true;
        loadExistingVits(props.vits);

        const loadVits = async () => {
                const result =  await axios.get(vitaminsUrl);
                loadVitamins(result.data);
                const vitData = await fillVitamins(result.data, props.vits);
                setVitaminFormData(vitData);
            }; //get vitamins data 
            loadVits();

            return () => {
                mounted = false;
            }
    }, [] );



    useEffect( () => {
        //console.log('vitaminFormData,', vitaminFormData);
        props.setArrFunc(vitaminFormData);

    }, [vitaminFormData] );

    const fillVitamins = async (vitamins, existingVits) => {
        let vitaminsInProduct = [];
        vitamins.map( (element) => {
            //console.log('element40', element, 'existingVits', props.vits);
            const isChecked  = (existingVits.find(x=>x.vitaminId == element.vitaminId) ) ? true : false; 
            const newVit = {
                'vitaminId': element.vitaminId,
                'vitaminTitle': element.title,
                'isChecked': isChecked
            }
        vitaminsInProduct.push(newVit);
        });
        setVitaminFormData(vitaminsInProduct);

        return vitaminsInProduct;
    }



    const toggleChecked = (el, index) => {
        vitaminFormData.filter(x=>x.vitaminId === el.vitaminId).forEach(element => {
            element.isChecked = !element.isChecked;
        });
        let newArr = [...vitaminFormData];
        setVitaminFormData(newArr);

        //this.props.parentCallback(event.target.myname.value);
        //event.preventDefault();

    } 

    return (

        <>
        <h1>VitaminCtrl</h1>
            {vitaminFormData.map((element, index) => {
                return (
                    <div key={index} className="checkboxfloat">

                        <Form.Check type="checkbox" className="vita"
                            id="vitamins[index]}" 
                            defaultValue={element.vitaminId} 
                            label={element.vitaminTitle}
                            checked={element.isChecked}
                            onChange={() => toggleChecked(element, index)}
                         />

                        <br />
                    </div>
                )
            })
            }
        </>
    )
}

export default VitaminCtrl;