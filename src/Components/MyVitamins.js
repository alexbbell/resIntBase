import React, {Component, useState, useTransition, Suspense, useEffect } from "react";

import { fetchDevelopers, fetchVitamins, fetchKinds, fetchAges}  from '../fakeApi'
import { useForm } from "react-hook-form";
import axios from "axios";
import { Form,  FormGroup, Label, Input, Button, Check } from 'react-bootstrap'



const MyVitamins = (props) => {
    const [vitamins, loadVitamins] = useState(fetchVitamins()); //get vitamins data 
    const [mode, setMode] = useState('new'); // mode. value == 'new' - new form, value == 'edit' - edit existing record
    const [premixData, setVitaminData] = useState({'test': '111', 'vitamins' : []});
    
    const host =   'https://localhost:7245/api/Premixes/';
    
    console.log('vitamins', vitamins);


    useEffect(() => {
 
        const req = host + 1;
        setMode('edit');
        let mounted = true;
        const loadData = async () => {
            const result = await axios.get(req);
            if (mounted) {
                var js = result.data;
                console.log('js', js);
                setVitaminData(
                    {
                        'test' : 'test',
                        'vitamins': js.vitamins, 
                        // 'title': js.title, 
                        // 'vid': js.vid, 
                        // 'tu': js.tu, 
                        
                        // 'age': js.age,
                        // 'developer' : js.developerName,
                        // 'developerId' : js.developerId
                    }
                        );
                //fillVitamins(js.vitamins);
                //checkboxesRenderCtrl(fillVitamins(js.vitamins))
                setMode('edit');
            }
        };
        loadData();
    
    
        return () => {
            mounted = false;
        }
    }, []);



    const onBtnClick = () => {
    setVitaminData(e=> {
        return {
            ...premixData, 
            test : 'test'
        }
    });
}

    const submitData = (data) =>  {
        console.log('data', data);
    }

    const RenderVitaminBlock = ({vit}) => {
console.log(vit);
        return (
            <Form.Check  type="checkbox" id={'vit' + vit.vitaminId} 
            label={vit.vitaminTitle} >
            </Form.Check>
        )
        // let str = vitamins.map((el) => {
        //     <div>{el.vitaminTitle}</div>
        // })
        
        // return (
        //     <ul>
        //         <li>1</li>
        //         <li>2</li>
        //         <li>3</li>
        //     </ul>
        // )

    }


    return (
        <Form onSubmit={submitData}>
            
            {/* <RenderVitaminBlock vits={vitamins} /> */}
            <div>
                {
                    vitamins.map(v => (
                        <li key={v.vitaminId}><RenderVitaminBlock vit={v} /></li>
                    ))
                }
            </div>

            <div>{premixData.test}</div>
            <div onClick={onBtnClick}>BUTTOM</div>
        </Form>
            )
    }


export default MyVitamins;