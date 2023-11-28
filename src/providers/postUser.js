import { backendURL } from "../Routes/useGetData";

export const postUser= async (data)=>{
    const res = await fetch(backendURL+'/all-users', {
       "method": "POST",
       headers:{
           "Content-type": "application/json"
       },
       body: JSON.stringify(data)

    })
    const result = await res.json();
} 