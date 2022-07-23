import { useState, useEffect } from 'react';
import axios from 'axios';

async function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        const result = await axios(url);
        // let newArray = [];
        // result.data.forEach(element => {
        //     newArray.push(
        //         {
        //             'id': element.premixId,
        //             'title': element.title,
        //             'vid': element.vid
        //         }
        //     );
        //     console.log(newArray);
        //});
        setData(result);
    };
    fetchData();
}, []);

  return { data, loading, error }
}

export default useFetch;
