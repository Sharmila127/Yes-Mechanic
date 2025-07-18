
import Client from "../../../api";

export const getDashboard = async (data:any)=>{
     try{
        const response = await new Client().admin.dashboard.get(data)
        return response;
    }
    catch(error){
        console.log('Error fetching data:',error);
    }
}

export  const GetTransactionDashboard = async (data:any)=>{
     try{
        const response = await new Client().admin.dashboard.getTransaction(data)
        return response;
    }
    catch(error){
        console.log('Error fetching data:',error);
    }
} 



export  const GetCustomerDetailsDashboard = async (data:any)=>{
     try{
        const response = await new Client().admin.dashboard.getCustomerDetails(data)
        return response;
    }
    catch(error){
        console.log('Error fetching data:',error);
    }
} 

