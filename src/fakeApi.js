import React, {Component, useState, useTransition, Suspense, useEffect } from "react";


const myArray = [
    { name: 'Alekesey', birthdate: '15.01.1980', position: 'Chief' },
    { name: 'Dina', birthdate: '10.03.1999', position: 'Manger' },
    { name: 'Marta', birthdate: '14.03.2002', position: 'Styident' },
    { name: 'Mark', birthdate: '14.08.2005', position: 'Styident' },
    { name: 'Ian', birthdate: '11.12.1981', position: 'Styident' },
]

const ages = [
    {value: 'drv', label:  'ДРВ'} , 
    {value: 'dish', label: 'ДиШ'},
    {value: 'mass', label: 'Массовое потребление'}]

const premixData = [
    { title: 'FI-2', vid: 'Комплекс с инулином', sostav: 'A, D3, B6, инулин', age : 'ДРВ', developer: 'Terezia', buyer: '', dstill: '2021'},
    { title: 'FI-2', vid: 'Комплекс с инулином', sostav: 'A, D3, B6, инулин', age : 'ДРВ', developer: 'Ресурс', buyer: '', dstill: '2021'},
    { title: 'FI-2S', vid: 'Комплекс с инулином', sostav: 'A, D3, B6, инулин', age : 'ДиШ', developer: '', buyer: '', dstill: ''},
    { title: 'VMP5', vid: 'Витаминно-минеральный', sostav: 'D3, кальций', age : 'ДРВ ДиШ Массовое', developer: 'Ресурс', buyer: '', dstill: ''},
    { title: 'VMP5G', vid: 'Витаминно-минеральный', sostav: 'D3, кальций', age : 'ДРВ ДиШ Массовое', developer: 'Cod Beck', buyer: '', dstill: ''},
    { title: 'VMP8-1', vid: 'Витаминно-минеральный', sostav: 'D3, йод', age : 'ДРВ', developer: 'Terezia', buyer: '', dstill: ''}
]	
const developers = [
    {value: 'terezia', label : 'Terezia'},
    {value: 'resurs', label: 'Ресурс'}, 
    {value: 'codbeck',  label: 'Cod Beck'}
]
const  vitamins = [
    { id: 1, title: 'A', rastvor: '' },
    { id: 2, title: 'D3', rastvor: '' },
    { id: 3, title: 'B6', rastvor: '' },
    { id: 4, title: 'инулин', rastvor: '' },
    { id: 5, title: 'кальций', rastvor: '' },
    { id: 6, title: 'йод', rastvor: '' }   
]

const kinds = [ 
    { value: 'withInulin', label:  'Комплекс с инулином' },
    { value: 'vitamin', label:  'Витаминно-минеральный'}
]




async function f() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(
                premixData[0]
            )
        }, 1000)
    })
}


export function getPremixById() {
    let result = premixData[0];
    return result;
}
export function fetchKinds() {
    return kinds;
}

export function fetchAges() {
    return ages;
}
export function fetchDevelopers() {
    return developers;
}

export function fetchVitamins() {    
    return vitamins;
}




// async function Test() {
//     let vitamin = vitamins[0];
//     vitamin.title = "AAAAA";
//     return vitamin;
// }

// export function  asTest() {
//     let t =  await  Test() 

//     return t;
// } 