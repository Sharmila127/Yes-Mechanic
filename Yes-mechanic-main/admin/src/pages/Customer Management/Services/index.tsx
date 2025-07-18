import Client from '../../../api'

export const getAllCustomer = async(params:string)=>{
    try{
        const response = await new Client().admin.customer_management.getallCustomer(params)
        return response;
    }catch(error){
        console.log("Error getting customer",error)
    }
}

export const getAllHistory = async(params:string)=>{
    try{
        const response = await new Client().admin.customermanagement_history.getallHistory(params)
        return response;
        console.log("Response from getAllHistory",response)
    }catch(error){
        console.log("Error getting customerHistory",error)
    }
}