import axios from "axios";

const host =   'https://localhost:7245/api/Premix/';


// const sendRequest = async () => {
//     try {
//     const resp = await axios.get(host);
//     console.log(resp.data);
// }
// catch(err) {
//         console.log(err)
//     }
// }
//sendRequest();



export  function getPromisePremixById(id) {
    id = 1;
    const req  = host  + id.toString();
    return axios.get(req).then(response => response.data)
}






export function SaveEmployee() {
    axios.get(host)
    .then((response) => {
        return response.data;        
    })
    .catch(ex => {
        console.log('Ошибка добавления ' + ex.message)
    });

}