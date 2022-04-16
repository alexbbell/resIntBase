import { createContext } from "react";


const PremixContextProvider = (props) => {


const [premixes, setPremixes] = useState( [
    {id: 1,  title: 'FI-2', vid: 'Комплекс с инулином'},
    {id: 2,  title: 'FI-2', vid: 'Комплекс с инулином'},
    {id: 3,  title: 'FI-2S', vid: 'Комплекс с инулином'},
    {id: 4,  title: 'VMP5', vid: 'Витаминно-минеральный'},
    {id: 5,  title: 'VMP5G', vid: 'Витаминно-минеральный'},
    {id: 6,  title: 'VMP8-1', vid: 'Витаминно-минеральный'}
])

const addPremix = (id,  title, vid) => {
    setPremixes([...premixes, {id, title, vid}]);
}

const deletePremix = (id) => {
    setPremixes(premixes.filter( premix => premix.id !== id  ));
}

return (
    <PremixContext.Provider value={{ premixes, addPremix }}>
        {props.children}
    </PremixContext.Provider>
)

}

export default PremixContextProvider