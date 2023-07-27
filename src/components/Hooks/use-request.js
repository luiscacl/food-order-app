
import { useState, useEffect, useCallback } from "react";

function useMealRequest(){
    const [getData, setGetData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);
    const [didSubmit, setDidSubmit] = useState(false);
    console.log('useMealRequest ejecutado')
    
    const httpRequest = useCallback(async (fetchName, fetchObjArg) => {
        setIsLoading(true);
        const url = `https://food-order-app-dfaf1-default-rtdb.firebaseio.com/${fetchName}.json`;
        console.log('httpRequest ejecutado');
        try{
            const response = await fetch(url, {
                method: fetchObjArg.method,
                headers: {
                    'Content-Type': 'application-json'
                },
                body: fetchObjArg.body ? JSON.stringify(fetchObjArg.body) : null
            });
    
            const data = await response.json();
    
            for(const transformedData in data){
                setGetData(data[transformedData]);
            }
            setDidSubmit(true);
            
        } catch(error){
            setHttpError(error.message);
            console.log(error);
        }

        setIsLoading(false);
    }, []);


    return {
        httpRequest,
        getData,
        isLoading,
        httpError,
        didSubmit
    }
}

export default useMealRequest;