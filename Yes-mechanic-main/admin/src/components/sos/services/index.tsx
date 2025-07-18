
import Client from "../../../api";


export const getsos =async (data:any)=>{
    try{ 
        const response:any =  await new Client().admin.sos.get(data)
        return response.data
    }
    catch(error)
    {
        console.log('Error fetching data:',error);
        
    }
}

export const  getallSos= async ()=>{
    try{
        const response = await new Client().admin.sos.getAll()
        console.log(response);
        return response
    }
    catch(error){
        console.log('Error fetching data:',error);
    }
}

export const updatesos = async (data:any,params:string)=>{
    try{
        const response = await new Client().admin.sos.put(data,params)
        return response
    }
    catch(error){
        console.log('Error fetching data:',error);
    }
}

export const postSos = async (data:any)=>{
    try{
        const response = await new Client().admin.sos.post(data)
        console.log(response);
        return response
    }
    catch(error){
        console.log('Error fetching data:',error);
    }
}

export const updatelistedsos = async (data:any,params:string) =>{
    try{
        const response = await new Client().admin.sos.updatelist(data,params)
        console.log(response);
        return response
    }
    catch(error){
        console.log('error listed data:',error)
    }
}

export const getServiceList = async()=>{
    try {
        const response = await new Client().admin.sos.getsosList()
        return response
    } catch (error) {
        console.log("get service list",error)
    }
}

export const statusupdatesos = async(data:any,params:string)=>{
    try {
        await new Client().admin.sos.statuslist(params,data)
    } catch (error) {
        console.log("get service list", error)
    }
}

export const deletesos = async (id:string)=>{
    try{
        console.log(id)
       const response:any = await new Client().admin.sos.delete(id)
       return response;
    }
    catch(error){
console.log("deleted sos",error)
    }
}